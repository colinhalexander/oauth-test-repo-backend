const axios = require('axios')
const router = require('express').Router()

router.post('/', (request, response, next) => {
  
  const { code } = request.body,
        oAuthUrl = `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
        config = { headers: { "Accept": "application/json" } }

  axios.post(oAuthUrl, {}, config)
    .then(reply => {
      process.env.GIT_ACCESS_TOKEN = reply.data.access_token

      axios.get("https://api.github.com/user", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.GIT_ACCESS_TOKEN}`
        }
      })
        .then(reply => {
          response.json({ user: reply.data })
        })
    })
    .catch(error => {
      console.log(error)
      response.json({ error })
    })
})

module.exports = router
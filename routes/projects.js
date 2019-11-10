const axios = require('axios')
const router = require('express').Router()

router.post('/', (request, response, next) => {

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.GIT_ACCESS_TOKEN}`
    }
  }

  axios.post("https://api.github.com/user/repos", request.body, config)
    .then(reply => {
      response.json({ data: reply.data })
    })
    .catch(error => {
      console.log("Error:", error)
      response.json({ error })
    })
});

module.exports = router;
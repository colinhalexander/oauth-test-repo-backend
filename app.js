const express = require('express');
const bodyParser = require('body-parser');
const githubOAuthRouter = require('./routes/github-oauth')
const projectsRouter = require('./routes/projects')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || '3000'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/oauth', githubOAuthRouter)
app.use('/projects', projectsRouter)

app.get('/', (request, response, next) => {
  response.send("Ya made it")
})

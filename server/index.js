'use strict'
const express = require('express')
const path = require('path')
const app = express()
const config = require('./config')

const publicPath = path.join(__dirname, '../public')

app.get('/', (req, res) =>{
  const options = {
    root: publicPath,
  }

  res.sendFile('index.html', options, errorOnlyCallback(res))
})

app.get('/static/:asset/:name', (req, res) => {
  const options = {
    root: path.join(publicPath, 'static', req.params.asset),
  }

  res.sendFile(req.params.name, options, errorOnlyCallback(res))
})

app.get('/static/css/fonts/:name', (req, res) => {
  const options = {
    root: path.join(publicPath, 'static/fonts'),
  }

  res.sendFile(req.params.name, options, errorOnlyCallback(res))
})

app.listen(config.PORT, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('app is listening on port', config.PORT)
})

function errorOnlyCallback (res) {
  return (err) => {
    if (err) {
      console.error(err)
      res.status(404).send()
    }
  }
}

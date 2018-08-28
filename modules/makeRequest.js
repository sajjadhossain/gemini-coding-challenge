const fs = require('fs')
const https = require('https')
const { exec } = require('child_process')
const writeFile = require('./writeFile')
const headersDir = './headers'
const requestsDir = './requests_log'
let newRequest
const makeRequest = (url, path) => {
  let headers
  let id

  headers = fs.readdirSync(headersDir)
  id = headers[headers.length - 1].match(/\d+/g)[0]

  let header = require('../headers/header-' + id + '.json')
  const response = {}
  const options = {
    hostname: url,
    host: url,
    path: path,
    method: 'POST',
    headers: header
  }

  options.agent = new https.Agent(options)

  https.get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      response.status = resp.statusCode
      response.header = resp.headers
      data += chunk;
    });

    resp.on('end', () => {
      response.data = JSON.parse(data)
      writeFile(requestsDir + '/request-' + id + '.json', JSON.stringify(response, null, 2))
    })

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })
}

newRequest = makeRequest

module.exports = newRequest

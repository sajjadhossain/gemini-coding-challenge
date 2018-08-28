const fs = require('fs')
const writeFile = require('./writeFile')
const readFileNoBreak = require('./readFileNoBreak')
const convertsDir = './converted_payloads'
const signaturesDir = './signatures'
const headersDir = './headers'
const converts = fs.readdirSync(convertsDir)
const signatures = fs.readdirSync(signaturesDir)
const headers = fs.readdirSync(headersDir)
const secret = require('../secret')
const secretKey = secret.key
const apiKey = secret.api
let newHeader
const generateHeader = () => {
  signatures.forEach((signature) => {
    let id = signature.match(/\d+/g)
    let header = {
      'POST': '/v1/order/new HTTP/1.1',
      'Host': 'api.sandbox.gemini.com',
      'Content-Length': 0,
      'Content-Type': 'WebKitFormBoundary7MA4YWxkTrZu0gW',
      'X-GEMINI-APIKEY': apiKey,
      'X-GEMINI-PAYLOAD': readFileNoBreak(convertsDir + '/converted-payload-' + id),
      'X-GEMINI-SIGNATURE': readFileNoBreak(signaturesDir + '/' + signature)
    }

    writeFile(headersDir + '/header-' + id + '.json', JSON.stringify(header, null, 2))
  })
}

newHeader = generateHeader

module.exports = newHeader

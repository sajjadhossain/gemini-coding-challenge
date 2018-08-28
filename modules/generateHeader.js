const fs = require('fs')
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
const writeHeader = (id, header) => {
  fs.writeFile(headersDir + '/header-' + id + '.json', header, (err) => {
    if (err) throw err
  })
}
const generateHeader = () => {
  signatures.forEach((signature) => {
    let id = signature.match(/\d+/g)
    let header = {
      'POST': '/v1/order/new HTTP/1.1',
      'Host': 'api.sandbox.gemini.com',
      'Content-Length': 0,
      'Content-Type': 'WebKitFormBoundary7MA4YWxkTrZu0gW',
      'X-GEMINI-APIKEY': apiKey,
      'X-GEMINI-PAYLOAD': fs.readFileSync(convertsDir + '/converted-payload-' + id, 'utf8').replace(/\n/g, ''),
      'X-GEMINI-SIGNATURE': fs.readFileSync(signaturesDir + '/' + signature, 'utf8').replace(/\n/g, '')
    }

    writeHeader(id, JSON.stringify(header, null, 2))
  })
}

newHeader = generateHeader

module.exports = newHeader

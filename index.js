const action = process.argv[2]
const payload = require('./modules/generatePayload')
const convert = require('./modules/convertPayload')
const sign = require('./modules/generateSignature')
const header = require('./modules/generateHeader')
const makeFiles = require('./modules/makeFiles')
const makeRequest = require('./modules/makeRequest')

const sandboxUrl = 'api.sandbox.gemini.com'
const newOrder = '/v1/order/new'

if (action === '--payload') {
  payload()
}
if (action === '--convert') {
  convert()
}
if (action === '--sign') {
  sign()
}
if (action === '--header') {
  header()
}
if (action === '--files') {
  makeFiles()
}
if (action === '--request') {
  makeRequest(sandboxUrl, newOrder)
}
if (!action && action != '--payload' && action != '--convert') {
  console.log(
    'ERROR:' +
    '\nProvide an action' +
    '\n    --payload' +
    '\n    --convert' +
    '\n    --sign' +
    '\n    --header' +
    '\n    --files' +
    '\n    --request'
  )
}

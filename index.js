const action = process.argv[2]
const payload = require('./modules/generatePayload')
const convert = require('./modules/convertPayload')
const sign = require('./modules/generateSignature')
// const header = require('./modules/generateHeader')

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
if (!action && action != '--payload' && action != '--convert') {
  console.log(
    'ERROR:' +
    '\nProvide an action' +
    '\n    --payload' +
    '\n    --convert' +
    '\n    --sign' +
    '\n    --header'
  )
}

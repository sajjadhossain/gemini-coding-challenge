const fs = require('fs')
const writeFile = require('./writeFile')
const startingNonce = require('../start')
const payloadsDir = './payloads'
const payloads = fs.readdirSync(payloadsDir)
let newPayload
const start = startingNonce
const nonces = () => {
  let payloadsCreated = []
  payloads.forEach((payload) => {
    if (payload[0] && payload != null) {
      payloadsCreated.push(payload.match(/\d+/g)[0])
    }
  })

  return payloadsCreated
}
const newNonce = () => {
  if(!payloads[0]){
    return start
  }
  else {
    return parseInt(nonces()[nonces().length-1]) + 1
  }
}
const payload = {
  client_order_id: '20150102-4738721',
  symbol: 'btcusd',
  amount: '34.12',
  price: '622.13',
  side: 'buy',
  type: 'exchange limit',
  options: ['maker-or-cancel'],
  request: '/v1/order/new',
  nonce: newNonce()
}
const writePayload = () => {
  writeFile(payloadsDir + '/payload-' + payload.nonce + '.json', JSON.stringify(payload, null, 2))
}

newPayload = writePayload

module.exports = newPayload

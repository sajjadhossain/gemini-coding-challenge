const fs = require('fs')
const { exec } = require('child_process')
const convertsDir = './converted_payloads'
const signaturesDir = './signatures'
const converts = fs.readdirSync(convertsDir)
const signatures = fs.readdirSync(signaturesDir)
const secret = require('../secret')
const secretKey = secret.key
let newSignature
const writeSignature = (id, payload) => {
  fs.writeFile(signaturesDir + '/signature-' + id, payload, (err) => {
    if (err) throw err
  })
}
const toSign = () => {
  let convertedPayloads = []

  converts.forEach((convert) => {
    let convertedPayload = {}
    if (signatures[0] === undefined) {
      convertedPayload.id = convert.match(/\d+/g)[0]
      convertedPayload.payload = fs.readFileSync(convertsDir + '/' + convert, 'utf8').replace(/\n/g, '')

      convertedPayloads.push(convertedPayload)
    }
    else {
      signatures.forEach((signature) => {
        if (signature.match(/\d+/g)[0] !== convert.match(/\d+/g)[0]) {
          convertedPayload.id = convert.match(/\d+/g)[0]
          convertedPayload.payload = fs.readFileSync(convertsDir + '/' + convert, 'utf8').replace(/\n/g, '')

          convertedPayloads.push(convertedPayload)
        }
      })
    }
  })

  return convertedPayloads
}
const sign = () => {
  const toDo = toSign()

  toDo.forEach((signature) => {
    const hmac = require('crypto').createHmac('sha384', secret.key).update(signature.payload)
    
    writeSignature(signature.id, hmac.digest('hex'))
  })
}

newSignature = sign

module.exports = newSignature

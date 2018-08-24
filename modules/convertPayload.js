const fs = require('fs')
const { exec } = require('child_process')
const convertsDir = './converted_payloads'
const payloadsDir = './payloads'
const converts = fs.readdirSync(convertsDir)
const payloads = fs.readdirSync(payloadsDir)
let newConversion
const toConvert = () => {
  let listToConvert = []
  payloads.forEach((payload) => {
    if (!converts[0]) {
      listToConvert.push(payload.match(/[A-z]{1,}-\d+.json/g)[0])
    }
    else {
      converts.forEach((convert) => {
        if (convert.match(/\d+/g)[0] !== payload.match(/\d+/g)[0]) {
          listToConvert.push(payload.match(/[A-z]{1,}-\d+.json/g)[0])
        }
      })
    }
  })

  return listToConvert
}
const convert = () => {
  const toDo = toConvert()
  toDo.forEach((convert) => {
    exec('sh ./scripts/base64.sh ' + payloadsDir + '/' + convert + ' ' + convertsDir + '/converted-payload-' + convert.match(/\d+/g)[0])
  })
}

newConversion = convert

module.exports = newConversion

const fs = require('fs')
const { exec } = require('child_process')
const makeFiles = () => {
  exec('node index.js --payload && node index.js --convert && node index.js --sign && node index.js --header', (error, stdout, stderr) => {
    console.log('creating payload > converting payload > generating signature > creating header.')
    if (error !== null) {
      console.log('ERROR: ' + error)
    }
  })
}

newFiles = makeFiles

module.exports = newFiles

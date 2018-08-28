let readFileNoBreak
const fs = require('fs')
const readFile = (path) => {
  let content
  content = fs.readFileSync(path, 'utf8').replace(/\n/g, '')

  return content
}

readFileNoBreak = readFile

module.exports = readFileNoBreak

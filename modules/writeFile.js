let newFile
const fs = require('fs')
const writeFile = (path, content) => {
  fs.writeFile(path, content, (err) => {
    if (err) throw err
  })

  return path
}

newFile = writeFile

module.exports = newFile

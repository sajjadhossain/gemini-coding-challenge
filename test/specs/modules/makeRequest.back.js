const exec = require('shelljs').exec
const { assert } = require('chai')
const fs = require('fs')

// TODO: add a dynamic request assertion, this does not currently validate the contents of the reponse
describe('Requests', () => {
  it('POST to /v1/order/new', (done) => {
    exec('node index.js --request', () => {
      const requests = fs.readdirSync('./requests_log')
      const content = require('../../../requests_log/' + requests[0])

      assert(requests[0] !== undefined, 'Got: ' + requests[0])
      assert(content.status !== undefined, 'Got: ' + content)
      assert(content.header !== undefined, 'Got: ' + content)
      assert(content.data !== undefined, 'Got: ' + content)
      done()
    })
  })
})

after((done) => {
  exec('npm run --silent delete:all', () => {
    const headers = fs.readdirSync('./headers')
    assert(headers[0] === undefined, 'Got: ' + headers[0])
    done()
  })
})

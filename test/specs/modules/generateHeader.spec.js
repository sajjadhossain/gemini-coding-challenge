const exec = require('shelljs').exec
const { assert } = require('chai')
const fs = require('fs')

before((done) => {
  exec('npm run --silent delete:all', () => {
    const headers = fs.readdirSync('./headers')
    assert(headers[0] === undefined, 'Got: ' + headers[0])
    done()
  })
})

describe('Header', () => {
  it('creates a payload', (done) => {
    exec('node index.js --payload', () => {
      const payloads = fs.readdirSync('./payloads')
      const content = require('../../../payloads/' + payloads[0])

      assert(payloads[0] !== undefined, 'Got: ' + payloads)
      assert(content.client_order_id !== undefined, 'Got: ' + content.client_order_id)
      assert(content.symbol === 'btcusd', 'Got: ' + content.symbol)
      assert(content.amount === '34.12', 'Got: ' + content.amount)
      assert(content.price === '622.13', 'Got: ' + content.price)
      assert(content.side === 'buy', 'Got: ' + content.side)
      assert(content.type === 'exchange limit', 'Got: ' + content.type)
      assert(content.options[0] === 'maker-or-cancel', 'Got: ' + content.options)
      assert(content.request === '/v1/order/new', 'Got: ' + content.request)

      done()
    })
  })
  it('converts a payload', (done) => {
    exec('node index.js --convert', () => {
      const converted = fs.readdirSync('./converted_payloads')

      assert(converted[0] !== undefined, 'Got: ' + converted[0])
      done()
    })
  })
  it('generates a signature', (done) => {
    exec('node index.js --sign', () => {
      const signatures = fs.readdirSync('./signatures')

      assert(signatures[0] !== undefined, 'Got: ' + signatures[0])
      done()
    })
  })
  it('compiles a header', (done) => {
    exec('node index.js --header', () => {
      const headers = fs.readdirSync('./headers')
      const content = require('../../../headers/' + headers[0])

      assert(headers[0] !== undefined, 'Got: ' + headers[0])
      assert(content.POST === '/v1/order/new HTTP/1.1', 'Got: ' + content.POST)
      assert(content['Content-Length'] === 0, 'Got: ' + content['Content-Length'])
      assert(content['Content-Type'] === 'WebKitFormBoundary7MA4YWxkTrZu0gW', 'Got: ' + content['Content-Type'])
      done()
    })
  })
})

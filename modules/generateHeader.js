const fs = require('fs')
const signaturesDir = './signatures'
const headersDir = './headers'
const signatures = fs.readdirSync(signaturesDir)
const headers = fs.readdirSync(headersDir)
const secret = require('../secret')
const secretKey = secret.key

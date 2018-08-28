# solution

## our tools

To use these scripts, you need a `secret.json` and you need to increment the `start.js` at the root of the project.

### secret.js
```js
module.exports = {
  key: '$secret',
  api: '$apikey'
}
```
### start.js

```js
module.exports = 3000000000
```

As stated prior, here are some modules that help us generate an authenticated header and to send a request to our endpoint.

1. Create the folder structure: `npm run init`
2. Generate a new payload: `npm run new:payload`
3. Convert a new payload: `npm run new:convert`
4. Create a signature with key and payload: `npm run new:signature`
5. Generate a header: `npm run new:header`
6. Lastly, make a request with `npm run new:request`

Alternatively, you can run just `npm run new:files` and `npm run new:request`.

## outcomes

Our request responded with 200-success twice. After that, it seems that the account ran out of funds to, so our response was a 406, with the following body:

```js
{
  "status": 406,
  "header": {
    "server": "nginx",
    "date": "Tue, 28 Aug 2018 02:21:36 GMT",
    "content-type": "application/json",
    "content-length": "171",
    "connection": "close"
  },
  "data": {
    "result": "error",
    "reason": "InsufficientFunds",
    "message": "Failed to place buy order on symbol 'BTCUSD' for price $622.13 and quantity 34.12 BTC due to insufficient funds"
  }
}
```

To answer the question of how this should be tested, we need the following users, stories and examples tested. We also need to plan our use cases in a hierarchy with stories prioritized by a scale that measures consumer and business impacts.

## our tests
### automation
To automate, I'd need to plan. [I cover what typical test types and suites look like as a plan](https://gist.github.com/sajjadhossain/c3aff1aaaca057e198d07bb308921b93#file-qualityapproachestotestingsoftware-md). For example, as a business, I would like to run a suite of tests against an environment, so that I can perform a regression against new features.

#### plan

The stories below represents the desired functionality we want to test. There a total of 5 stories, one for each step identified above. So as an SDET, I need to tool together a bunch of scripts, methods or functions that let me achieve my test.

##### stories

```gherkin
As a business,
I want to run a suite of tests against an environment,
so that I can perform a regression against new features

```

###### 1. Generate a unique payload

```gherkin
As a developer,
I want to generate a unique payload,
So that I can convert it
  
| Examples |
| GET Request |
| POST Request |
| Valid Payload |
| Invalid Payload, parameters |
| Invalid Payload, values |
```
  
For this scenario itself to be tested, we need the following use cases:
    
* Payload for type of request
* Schema
    * Test responses for multiple JSON profiles
        * Valid, Invalid parameters
        * Boundary test on values
        * Valid, Invalid values for each parameter

See the code [here](../modules/generatePayload.js), and the test [here](../test/specs/modules/generateHeader.js). This module will create a payload, with the nonce as an id, in `payloads`. Run this module alone with `npm run new:payload`. The outcome should look something like:
    
```json
{
  "client_order_id": "20150102-4738721",
  "symbol": "btcusd",
  "amount": "34.12",
  "price": "622.13",
  "side": "buy",
  "type": "exchange limit",
  "options": [
    "maker-or-cancel"
  ],
  "request": "/v1/order/new",
  "nonce": 2000000050
}
```

###### 2. Convert payload to base64

```gherkin
As a developer,
I want to convert my unique payload,
So that I can pass it in the header of my request
```
    
After the payload is created, this module converts the payload, with the same nonceID to base64, in `converted_payloads`. See the code [here](../modules/convertPayload.js), and the test [here](../test/specs/modules/generateHeader.js). Run this alone with `npm run new:convert`. The outcome should look something like:
    
```
ewogICJjbGllbnRfb3JkZXJfaWQiOiAiMjAxNTAxMDItNDczODcyMSIsCiAgInN5
bWJvbCI6ICJidGN1c2QiLAogICJhbW91bnQiOiAiMzQuMTIiLAogICJwcmljZSI6
ICI2MjIuMTMiLAogICJzaWRlIjogImJ1eSIsCiAgInR5cGUiOiAiZXhjaGFuZ2Ug
bGltaXQiLAogICJvcHRpb25zIjogWwogICAgIm1ha2VyLW9yLWNhbmNlbCIKICBd
LAogICJyZXF1ZXN0IjogIi92MS9vcmRlci9uZXciLAogICJub25jZSI6IDIwMDAw
MDAwNTAKfQ==
```
    
 For this scenario to be tested, we need to consider following use cases:
    
* Valid Payload Converted
* Invalid Payload Converted
* Boundary test on Payload converted

###### 3. Create a signature
    
```gherkin
As a developer,
I want to encrypt my unique payload with my secret as my hash,
So that I can pass it in the header of my request as my signature
```
    
Using the payload and secret, we can generate a signature, in `./signatures`. See the code [here](../modules/generateSignature.js), and the test [here](../test/specs/modules/generateHeader.js). Run this alone with `npm run new:signature`. The output should look something like:
    
```
fb991d1592b8aa420b072fce49db6e78b9d2813a3e8e60ffcc280a7dde5bbcfe4e833c0dd02035bd4447651f76c7a132
```
    
For this scenario to be tested, we need to consider following use cases:
    
* Valid Signature, keys
* Invalid Signature, keys
* Valid Signature, payload
* Invalid Signature, payload

###### 4. Generate header

```gherkin
As a developer,
I want to use my payload, my encrypted signature,
So that I create a unique and authorized header
```
    
Now that we have our payload and our signature, we can create a header in `./headers`. See the code [here](../modules/generateHeader.js), and the test [here](../test/specs/modules/generateHeader.js). Run this alone with `npm run new:header`. The output should looks something like:
    
```js
{
  "POST": "/v1/order/new HTTP/1.1",
  "Host": "api.sandbox.gemini.com",
  "Content-Length": 0,
  "Content-Type": "WebKitFormBoundary7MA4YWxkTrZu0gW",
  "X-GEMINI-APIKEY": "apiKey",
  "X-GEMINI-PAYLOAD": "ewogICJjbGllbnRfb3JkZXJfaWQiOiAiMjAxNTAxMDItNDczODcyMSIsCiAgInN5bWJvbCI6ICJidGN1c2QiLAogICJhbW91bnQiOiAiMzQuMTIiLAogICJwcmljZSI6ICI2MjIuMTMiLAogICJzaWRlIjogImJ1eSIsCiAgInR5cGUiOiAiZXhjaGFuZ2UgbGltaXQiLAogICJvcHRpb25zIjogWwogICAgIm1ha2VyLW9yLWNhbmNlbCIKICBdLAogICJyZXF1ZXN0IjogIi92MS9vcmRlci9uZXciLAogICJub25jZSI6IDIwMDAwMDAwNTAKfQ==",
  "X-GEMINI-SIGNATURE": "fb991d1592b8aa420b072fce49db6e78b9d2813a3e8e60ffcc280a7dde5bbcfe4e833c0dd02035bd4447651f76c7a132"
}
```
    
For this scenario to be tested, we need to consider following use cases:
    
* Valid Header
* Invalid Header, keys
* Invalid Header, values

###### 5. Make the request

```gherkin
As a developer,
I want to use my authorized header,
So that I can make a request
```
    
After we have created all of our files, we can make a request with the data that was generated, and saves the output in `./requests_log`. See the code [here](../modules/makeRequest.js), and the test [here](../test/specs/modules/makeRequest.js). This module makes a request using the `request` method in `http`. Run this alone with `npm run new:request`. The response should look something like:
    
```json
{
  "status": 406,
  "header": {
    "server": "nginx",
    "date": "Tue, 28 Aug 2018 00:10:39 GMT",
    "content-type": "application/json",
    "content-length": "171",
    "connection": "close"
  },
  "data": {
    "result": "error",
    "reason": "InsufficientFunds",
    "message": "Failed to place buy order on symbol 'BTCUSD' for price $622.13 and quantity 34.12 BTC due to insufficient funds"
  }
}
```
    
For this scenario to be tested, we need to consider following use cases:
    
* Valid Header
* Invalid Header, keys
* Invalid Header, values
* Type of request
* Boundary tests
    * Number of requests
    * Duplicate request
* User states
    * New user
    * Existing user, funds
    * Existing user, no funds
    * Existing user, blocked

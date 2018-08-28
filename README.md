# gemini coding challenge
## problem
The new order API endpoint is described [here](https://docs.gemini.com/rest-api/#new-order). How will you test it?

* Please code up functional test cases in the language of your choice or pseudocode.
* Include both positive and negative cases.
* Be able to quantify the number of distinct tests run.
* Do not invoke any other API endpoints (e.g., order status).
* Clearly articulate your assumptions.

### sandbox
* **URL:** https://api.sandbox.gemini.com
* **Key:** $key
* **Secret:** $secret

## solution
See [solution.md](./wiki/solution.md).

#### how I tested this feature
Using [postman](https://www.getpostman.com/), I was able to get a request through to the endpoint with the below steps. However, we wont be able to use the same headers to generate another `200` response. In order to make another successful request, we'd need to regenerate a few pieces of information. I generated my payload and signature, with the following steps:

1. Create a payload.json

    ```json
    {
      "client_order_id": "20150102-4738721",
      "symbol": "btcusd",
      "amount": "34.12",
      "price": "622.13",
      "side": "buy",
      "type": "exchange limit",
      "options": ["maker-or-cancel"],
      "request": "/v1/order/new",
      "nonce": 1000000000
    }
    ```
    * `nonce` needs to be noted and incremented as requests are made

2. After creating the payload.json, I used a shell script to convert my JSON in to base64:

    ```bash
    openssl base64 -in $1 -out $2
    ```

3. Then I used another shell script to create my encrypted signature:

    ```bash
    echo -n $1 | openssl sha384 -hmac $2
    ```

4. Finally this gave me my full header:

    ```bash
    POST /v1/order/new HTTP/1.1
    Host: api.sandbox.gemini.com
    Content-Length: 0
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
    X-GEMINI-APIKEY: 0Ad2raecQBpUJs8difrv
    X-GEMINI-PAYLOAD: ewogICJjbGllbnRfb3JkZXJfaWQiOiAiMjAxNTAxMDItNDczODcyMSIsCiAgInN5bWJvbCI6ICJidGN1c2QiLAogICJhbW91bnQiOiAiMzQuMTIiLAogICJwcmljZSI6ICI2MjIuMTMiLAogICJzaWRlIjogImJ1eSIsCiAgInR5cGUiOiAiZXhjaGFuZ2UgbGltaXQiLAogICJvcHRpb25zIjogWyJtYWtlci1vci1jYW5jZWwiXSwKICAicmVxdWVzdCI6ICIvdjEvb3JkZXIvbmV3IiwKICAibm9uY2UiOiAxMDAwMDAwMDAwCn0K
    X-GEMINI-SIGNATURE: a8609f88b6d9b4f4cf9ed35afe5106473fd315961ca8d53b1549e5aecfcfe7aba3bac8dd00640570fc772155bdb535d0
    Cache-Control: no-cache
    Postman-Token: 78402821-bc4e-f3f5-b7d8-f2b82f16c180
    ```
    
5. After sending my request, I got a response like:

    ```json
    {
        "order_id": "103413857",
        "id": "103413857",
        "symbol": "btcusd",
        "exchange": "gemini",
        "avg_execution_price": "0.00",
        "side": "buy",
        "type": "exchange limit",
        "timestamp": "1535005846",
        "timestampms": 1535005846365,
        "is_live": true,
        "is_cancelled": false,
        "is_hidden": false,
        "was_forced": false,
        "executed_amount": "0",
        "remaining_amount": "34.12",
        "client_order_id": "20150102-4738721",
        "options": [
            "maker-or-cancel"
        ],
        "price": "622.13",
        "original_amount": "34.12"
    }
    ```

#### running our automation commands

To use these scripts, you need a `secret.json` and you need to increment the `start.js` at the root of the project.

##### secret.js
```js
module.exports = {
  key: '$secret',
  api: '$apikey'
}
```
##### start.js

```js
module.exports = 3000000000
```

I've created a couple of scripts to help our goal of automating this as a test. You can skip steps 2-5 with `npm run new:files`

Run `npm install`, then:

1. Create the folder structure: `npm run init`
2. Generate a new payload: `npm run new:payload`
3. Convert a new payload: `npm run new:convert`
4. Create a signature with key and payload: `npm run new:signature`
5. Generate a header: `npm run new:header`
6. Lastly, make a request with `npm run new:request`

Again, you only have to run `npm run new:files` and `npm run new:request`.

#### testing our commands

`npm run test`

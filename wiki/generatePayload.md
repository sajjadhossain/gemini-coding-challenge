# generate a payload

See the code, [here](../modules/generatePayload.js). This module will create a payload, with the nonce as an id, in `payloads`.

Run this module alone with `npm run new:payload`. The outcome should look something like:

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


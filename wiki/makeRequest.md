# make a request

After we have created all of our files, we can make a request with the data that was generated, and saves the output in `./requests_log`. This module makes a request using the `request` method in `http`. Run this alone with `npm run new:request`. The response should look something like:

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

# create a header

Now that we have our payload and our signature, we can create a header in `./headers`. Run this alone with `npm run new:header`. The output should looks something like:

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

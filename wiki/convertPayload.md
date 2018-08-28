# convert a payload

After the payload is created, this module converts the payload, with the same nonceID to base64, in `converted_payloads`. See the code, [here](../modules/convertPayload.js). Run this alone with `npm run new:convert`. The outcome should look something like:

```
ewogICJjbGllbnRfb3JkZXJfaWQiOiAiMjAxNTAxMDItNDczODcyMSIsCiAgInN5
bWJvbCI6ICJidGN1c2QiLAogICJhbW91bnQiOiAiMzQuMTIiLAogICJwcmljZSI6
ICI2MjIuMTMiLAogICJzaWRlIjogImJ1eSIsCiAgInR5cGUiOiAiZXhjaGFuZ2Ug
bGltaXQiLAogICJvcHRpb25zIjogWwogICAgIm1ha2VyLW9yLWNhbmNlbCIKICBd
LAogICJyZXF1ZXN0IjogIi92MS9vcmRlci9uZXciLAogICJub25jZSI6IDIwMDAw
MDAwNTAKfQ==
```

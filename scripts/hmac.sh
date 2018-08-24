#!/usr/bin/env bash
echo -n $1 | openssl sha384 -hmac $2

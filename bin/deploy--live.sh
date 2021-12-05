#!/bin/sh

clear && cd helm && \
helm upgrade kavanest-api . \
--install \
--namespace kavanest \
-f values/live.yaml
# --create-namespace

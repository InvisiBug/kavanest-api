#!/bin/sh

clear && cd helm && \
helm upgrade kavanest-test-api . \
--install \
--namespace kavanest-test \
-f values/test.yaml

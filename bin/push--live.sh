#!/bin/sh

REGISTRY_IP=192.168.1.61:5000
yarn install && \
yarn build && \
docker build -f ./Dockerfile.kube -t kavanest-api:live . && \
docker tag kavanest-api:live $REGISTRY_IP/kavanest-api:live && \
docker push $REGISTRY_IP/kavanest-api && \
rm -r dist

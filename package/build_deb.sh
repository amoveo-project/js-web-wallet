#!/bin/bash

BRANCH=${1:-master}
mkdir -p debian/var/www/html/amoveo-wallet/app >/dev/null 2>&1
rm -rf debian/var/www/html/amoveo-wallet/*

VERSION=$(git describe --always --tags | sed -re "s%-%~${BRANCH}+%" -re "s%/%-%g" | sed -re 's/^[^0-9]//g')

(
    cd ..

    rm -rf build
    mkdir build

    yarn
    yarn build
)

fpm -s dir -t deb \
    -n exantech-amoveo-wallet \
    -v ${VERSION} \
    -a all \
    --prefix=/ \
    ../build/=/var/www/html/amoveo-wallet/

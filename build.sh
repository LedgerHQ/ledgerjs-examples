#!/bin/bash

rm -rf dist/
mkdir -p dist
npm install markdown-to-html -g

echo '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>ledgerjs-examples</title></head><body>' > dist/index.html
github-markdown --flavor gfm README.md >> dist/index.html
echo '</body></html>' >> dist/index.html

cd bluetooth-web-react
npm install
npm run build
mv build ../dist/bluetooth-web-react
cd -

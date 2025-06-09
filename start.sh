#!/bin/bash
cd Frontend
npm install
npm run build
cp -r dist/* ../Backend/src/public/
cd ../Backend
npm install
node src/main.js
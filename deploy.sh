#!/usr/bin/env sh
set -e
npm run build
cd dist
git init
git add -A
git commit -m 'Deploy to GitHub Pages'
git branch -M gh-pages
git remote add origin https://github.com/sa23515193-hash/Al-Matiri-Fiber-Glass.git
git push -u origin gh-pages --force
cd ..

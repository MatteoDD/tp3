#!/usr/bin/env sh

# abort on errors
set -e

# build
pnpm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# git push -f https://github.com/MatteoDD/tp3.github.io.git main
git push -f https://github.com/MatteoDD/tp3 master:deploy

cd -

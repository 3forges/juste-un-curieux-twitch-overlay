#!/bin/bash

cd ./.ci/
ls -alh .
pwd
# pnpm run clean || true
pnpm i && pnpm run meta:build
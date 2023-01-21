#!/bin/bash

set -ex

TARGET=gs://figurl/jfm-1

yarn build
gsutil -m cp -R ./build/* $TARGET/
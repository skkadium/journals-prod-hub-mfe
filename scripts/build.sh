#!/bin/sh

# Clean last build
rm -rf dist

# Make dist directories
mkdir dist

# Copy web app build output
cp -a apps/web-app/dist/. dist/
#!/bin/sh 

#
# Usage: deprecate <table directory> "<commit message to GitHub>"
#
#
#


echo "Removing $1";
echo "Commit message: $2";
cp -r "$1" ../yql-deprecated-tables;
rm -r -i "$1";
git add .
git commit -am "$2";

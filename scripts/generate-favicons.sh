#!/bin/bash

#===================================================================================
# This is a script to convert the .svg's in src/client/assets/favicons into .ico's
#
# It needs imagemagick to be installed (== 'convert' is found in $PATH).
#===================================================================================

for f in src/client/assets/favicons/*.svg
do
  convert \
    -density 256x256 \
    -background transparent \
    -define icon:auto-resize \
    -colors 256 \
    -set filename:base "%t" \
    $f "src/client/assets/favicons/%[filename:base].ico"
done

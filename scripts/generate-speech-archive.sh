#!/usr/bin/env bash
set -o errexit
set -o nounset

echo "Generating speech archive"

pushd ./speech
tar -czf ../web/assets/audio/speech.tar.gz *.mp3
popd

echo "Generated speech archive"
du -hs ./web/assets/audio/speech.tar.gz

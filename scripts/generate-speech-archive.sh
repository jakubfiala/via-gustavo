#!/usr/bin/env bash
set -o errexit
set -o nounset

echo "Generating speech archive"

pushd ./speech
tar -cvf - *.mp3 | gzip -n > ../web/assets/audio/speech.tar.gz
popd

echo "Generated speech archive"
du -hs ./web/assets/audio/speech.tar.gz

#!/usr/bin/env bash
set -o errexit
set -o nounset

echo "Generating speech archive"

pushd ./assets/audio/speech
tar -cf ../speech.tar *.mp3
popd

echo "Generated speech archive"
du -hs ./assets/audio/speech.tar

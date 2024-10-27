#!/usr/bin/env bash
set -o errexit
set -o nounset

# Turns a provided input image ($1) into a set of tiles
# for the different zoom levels required by Google Street View.
# Saves them in the given directory ($2).

# The images will be named `z<ZOOM_LEVEL>-i<INDEX>`.
# You can multiply the Y coordinate by the "row size" at the given zoom level
# and add the X coordinate to get the `<INDEX>` - i.e. `y * ROW_SIZE + x`,
# so at level 4 this would be `y * 4 + x`.

# Based on this great blog post by Marc Ridey:
# https://blog.mridey.com/2010/05/how-to-create-and-display-custom.html

input_image="$1"
output_path="$2"

world_size="4096x2048"

levels=(
  "4 100%  12x6"
  "3 50%   6x3"
  "2 25%   3x2"
  "1 12.5% 2x1"
  "0 6.25% 1x1"
)

echo "Tiling image $input_image into $output_path at $world_size"

# First, we resize the original to our desired 'world size'.
# We store this image in a temporary file.
resized="$(mktemp)"
convert "$input_image" -resize "$world_size" "$resized"

for level in "${levels[@]}"
do
  # Get the parameters for this zoom level.
  IFS=" " read -ra params <<< "$level"

  zoom="${params[0]}"
  resize="${params[1]}"
  tiles="${params[2]}"

  echo "At zoom $zoom, resizing to $resize and creating $tiles tiles"

  convert "$resized" -resize "$resize" -crop "$tiles"@ +repage +adjoin "$output_path/z$zoom-i%d.jpg"
done

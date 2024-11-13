// cheeky script to stitch together all tiles for a google panorama
// for private research purposes only


// lhceA_Fts0IINvq26BbcQw (at difunta's animita)

// FDVGJ2MUKTs1ZWOW9Wko9Q (mirror location)
// UaKCGfhkFtU072sRS_sQ8A (mirror 2 location)
// cPomnYUEZP_38gHYrgNj3g (mirror 3 location)

// REjdyk2fgnf3LWBQudZiGg (outside Humberstone)


const grab = async (pano, w, h) => {
  const getUrl = (x,y) =>`https://streetviewpixels-pa.googleapis.com/v1/tile?cb_client=apiv3&panoid=${pano}&output=tile&x=${x}&y=${y}&zoom=4&nbt=1&fover=2`;

  const fetchTile = (x,y) => {
    const img = new Image();
    img.crossOrigin = true;
    img.src = getUrl(x,y);
    return img;
  };

  const t = 512;

  window.canvas = new OffscreenCanvas(w*t, h*t);
  const c = canvas.getContext('2d');

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const img = fetchTile(x, y);
      img.addEventListener('load', () => {
        console.info('loaded', x, y);
        c.drawImage(img, x * t, y * t);
      });
    }
  }
};

const show = async () => {
  const blob = await canvas.convertToBlob();
  const url = URL.createObjectURL(blob);
  window.open(url);
}

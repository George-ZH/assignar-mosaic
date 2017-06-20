/* convert
 * - image link
 * - image other base64 code, such as svg+xml
 * to jpeg base64 code
 *
 * support pass callback
 */
export const convertToJPEGBase64 = (src, callback) => {
  const maxHeight = 500;
  const maxWidth = 500;

  let canvas = document.createElement( "canvas" );
  let ctx = canvas.getContext( "2d" );

  let img = document.createElement( "img" );

  img.crossOrigin="anonymous"
  img.setAttribute( "src", src);

  img.onload = () => {
    let rate = Math.min(maxHeight / img.height, 1);
    rate = Math.min(maxWidth / img.width, rate);

    canvas.width = img.width * rate;
    canvas.height = img.height * rate;

    ctx.drawImage(img,
      0, 0, img.width, img.height, // original size
      0, 0, canvas.width, canvas.height // resize
    );

    let imageBase64 = canvas.toDataURL("image/jpeg");
    if (callback) {
      callback({
        link : imageBase64,
        width :canvas.width,
        height : canvas.height
      });
    }
  };
}

// convert datetime to string
// 1497415203 -> 17/06/2017
export const convertDatetimeToString = num => {
  let d = new Date(num*1000);
  return `${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`
}

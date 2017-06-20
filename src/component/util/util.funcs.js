/* convert
 * - image link
 * - image other base64 code, such as svg+xml
 * to jpeg base64 code
 *
 * support pass callback
 */
export const convertToJPEGBase64 = (src, callback) => {
  let canvas = document.createElement( "canvas" );
  let ctx = canvas.getContext( "2d" );

  let img = document.createElement( "img" );

  img.crossOrigin="anonymous"
  img.setAttribute( "src", src);

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    let imageBase64 = canvas.toDataURL("image/jpeg");
    if (callback) {
      callback(imageBase64);
    }
  };
}

// convert datetime to string
// 1497415203 -> 17/06/2017
export const convertDatetimeToString = num => {
  let d = new Date(num*1000);
  return `${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`
}

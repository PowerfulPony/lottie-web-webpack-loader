const Jimp = require('jimp-compact');

function lottieWebWebpackLoaderScaleLoader(buffer) {
  const options = JSON.parse(this.query.replace(/^\?/, ''));
  const done = this.async();

  const promise = Jimp.read(buffer)
    .then((image) => image.scale(options.scale))
    // eslint-disable-next-line no-underscore-dangle
    .then((image) => image.getBufferAsync(image._originalMime))
    .catch((err) => {
      console.error(err);
    });

  promise.then((result) => { done(null, result); });
}

module.exports = lottieWebWebpackLoaderScaleLoader;
module.exports.raw = true;

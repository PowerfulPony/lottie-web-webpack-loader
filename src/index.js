const path = require('path');

function lottieWebWebpackLoader(json) {
  if (this.cacheable) {
    this.cacheable();
  }
  const done = this.async();

  const data = JSON.parse(json);

  const imageModules = [];

  data.assets.forEach((item, index) => {
    if (item.p) {
      const imagepath = `${item.u}/${item.p}`;
      item.u = '';
      imageModules.push({
        path: imagepath,
        index,
      });
    }
  })

  const lottie = JSON.stringify(data, null, 2);

  let output = '';
  if (imageModules.length) {
    output += `const assets = [];\n`;
  }
  imageModules.forEach((asset) => {
    output += `assets.push([require(${JSON.stringify('./'+asset.path)}).default, ${asset.index}]);\n`;
  })

  output += `const data = ${lottie}\n`;

  if (imageModules.length) {
    output += `
assets.forEach((asset) => {
  const path = asset[0];
  const index = asset[1];
  data.assets[index].p = path;
});\n`;
  }

  output += `module.exports = data;`;
  done(null, output);
}

module.exports = lottieWebWebpackLoader;

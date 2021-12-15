const path = require('path');

const scaleLoaderPath = require.resolve('./scaleLoader.js');

function getOptions(stringQuery) {
  if (stringQuery === '' || typeof (stringQuery) !== 'string') return stringQuery;
  const query = JSON.parse(stringQuery.replace(/^\?/, ''));
  if (!query.assets && query.scale) {
    query.assets = { scale: query.scale };
  } else if (query.assets && !query.assets.scale) {
    query.assets = { scale: 1 };
  }
  return query;
}

function lottieWebWebpackLoader(json) {
  const options = getOptions(this.resourceQuery !== '' ? this.resourceQuery : this.query);
  const done = this.async();

  const data = JSON.parse(json);

  const imageModules = [];

  data.assets.forEach((asset, index) => {
    if (asset.p) {
      const imageAbsPath = path.join(this.context, asset.u, asset.p);
      const imageRelPath = `.${path.sep}${path.relative(this.context, imageAbsPath)}`;

      imageModules.push({
        path: imageRelPath,
        index,
      });

      asset.u = ''; // eslint-disable-line no-param-reassign

      this.resolve(imageAbsPath, '', () => {
        this.addDependency(imageAbsPath);
      });
    }
  });

  if ((options.assets && options.assets.scale) && imageModules.length) {
    const multiplier = options.assets.scale;
    imageModules.forEach((assets) => {
      const imageRelPath = assets.path;
      const loaderString = `${scaleLoaderPath}?{"scale":${multiplier}}!${imageRelPath}`;
      assets.path = loaderString; // eslint-disable-line no-param-reassign
    });
  }

  const lottie = JSON.stringify(data, null, 2);

  let output = '';
  if (imageModules.length) {
    output += 'const assets = [];\n';
  }
  imageModules.forEach((asset) => {
    output += `assets.push([require(${JSON.stringify(asset.path)}).default ? require(${JSON.stringify(asset.path)}).default: require(${JSON.stringify(asset.path)}), ${asset.index}]);\n`;
  });

  output += `const data = ${lottie}\n`;

  if (imageModules.length) {
    output += `
assets.forEach((asset) => {
  const path = asset[0];
  const index = asset[1];
  data.assets[index].p = path;
});\n`;
  }

  output += 'module.exports = data;';
  done(null, output);
}

module.exports = lottieWebWebpackLoader;

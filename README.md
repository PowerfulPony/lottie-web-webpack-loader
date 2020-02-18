# Load and optimize assets for json lottie-web files

## Usage

```
npm install lottie-web-webpack-loader --save-dev
```

**`webpack.config.js`**

```javascript
module.exports = {
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: /(lottie)/,
        loader: 'lottie-web-webpack-loader',
        options: {
          assets: {
            scale: 0.5 // proportional resizing multiplier
          }
        }
      }
    ]
  }
}
```

**`animation.js`**

```javascript
import lottie from 'lottie-web';
import animationData from '@/assets/lottie/hero/index.json';

const heroAnimation = lottie.loadAnimation({
  container: document.getElementById('hero-animation'),
  renderer: 'svg',
  animationData
});

heroAnimation.goToAndPlay(0, true);
```

## Dependencies

[oliver-moran/jimp](https://github.com/oliver-moran/jimp/tree/master/packages/jimp)

## License

MIT
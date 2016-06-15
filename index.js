/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  process.env.webpackAssets = JSON.stringify({});
  process.env.webpackChunkAssets = JSON.stringify({});
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack.config.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require('babel-polyfill');

  // CSS modules hook to inject css-modules classes in the final html.
  require('css-modules-require-hook')({
    generateScopedName: '[name]__[local]__[hash:base64:5]',
    devMode: true
  });

  require('./server/server');
}

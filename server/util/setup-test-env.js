// CSS modules hook to inject css-modules classes in the final html.
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]__[hash:base64:5]',
  devMode: true,
});

require('babel-register');
require('babel-polyfill');

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

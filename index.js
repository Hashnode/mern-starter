/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  require('./static/dist/server.bundle.js');
} else {
  require('babel-register');
  require('babel-polyfill');
  require('css-modules-require-hook');
  require('./server/server');
}

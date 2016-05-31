/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  require('./static/dist/server.bundle.js');
} else {
  // System.import polyfill
  if (typeof System === 'undefined') {
    System = {
      import: function(path) {
        return Promise.resolve(require(path));
      },
    };
  }

  require('babel-register');
  require('babel-polyfill');
  require('css-modules-require-hook');
  require('./server/server');
}

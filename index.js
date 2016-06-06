/**
 * Entry Script
 */

// If the server is webpacked, css modules is not working. Have to find another way to inject css modules classnames in html without css-modules-require-hook.
// if (process.env.NODE_ENV === 'production') {
//   require('./dist/server.bundle.js');
// }


// Ignore css and image files in babel
const noop = () => { };
require.extensions['.css'] = noop();

// Babel polyfill to convert ES6 code in runtime
require('babel-register');
require('babel-polyfill');

// CSS modules hook to inject css-modules classes in the final html.
require('css-modules-require-hook')({
  generateScopedName: process.env.NODE_ENV === 'production' ? '[hash:base64]' : '[name]__[local]__[hash:base64:5]',
});

require('./server/server');

/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  // Ignore css and image files in babel
  const noop = () => {
  };
  require.extensions['.css'] = noop();

  // Babel polyfill to convert ES6 code in runtime
  require('babel-register');
  require('babel-polyfill');

  // CSS modules hook to inject css-modules classes in the final html.
  require('css-modules-require-hook')({
    generateScopedName: '[name]__[local]__[hash:base64:5]',
    devMode: true
  });

  require('./server/server');
}

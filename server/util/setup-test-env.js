// To get normal classnames instead of CSS Modules classnames for testing
require('mock-css-modules');

// Ignore assets
require.extensions['.jpg'] = noop => noop;
require.extensions['.jpeg'] = noop => noop;
require.extensions['.png'] = noop => noop;
require.extensions['.gif'] = noop => noop;

require('babel-register');
require('babel-polyfill');
require('raf/polyfill');

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

// use .default export?
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

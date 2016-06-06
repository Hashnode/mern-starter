// Mocha helper file to ignore webpack assets during testing
function noop() {
  return null;
}

require.extensions['.css'] = noop;

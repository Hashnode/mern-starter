if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.prod');
} else {
  module.exports = require('./index.dev');
}

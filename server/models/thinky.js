var config = require('../config');
var thinky = require('thinky')(config.rethinkDb);
module.exports = thinky;

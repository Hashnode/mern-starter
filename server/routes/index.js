const express = require('express')
const router = express.Router();

module.exports = {
  posts: require('./post.routes'),
};

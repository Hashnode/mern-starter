const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  baseURL: process.env.BASE_URL || 'http://localhost:8000'
};

module.exports = config;

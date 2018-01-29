const config = {
  nodeEnv: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  testMongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-test',
  port: process.env.PORT || 8000,
};

module.exports = config;

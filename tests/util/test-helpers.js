const mongoose = require('mongoose');
const mockgoose = require('mockgoose');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

exports.connectDB = function (done) {
  // mongoose.connect('mongodb://localhost:27017/mern-test', (error) => {
  //   if (error)
  //     console.log('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
  //   else {
  //     console.log('Connected to DB at mongodb://localhost:27017/mern-test');
  //     done();
  //   }
  // });
}

exports.dropDB = function () {
  mongoose.disconnect();
}

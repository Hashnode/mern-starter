var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var Mockgoose = require('mockgoose-fix').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

exports.connectDB = async function () {
  console.log('Setting up Mockgoose.');
  await mockgoose.prepareStorage();
  console.log('Done. Setting up test connection.');
  let x = await mongoose.connect('mongodb://localhost:27017/mern-test');
  return x;
}

exports.dropDB = async function () {
  return await mockgoose.helper.reset();
}

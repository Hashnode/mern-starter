import mongoose from 'mongoose';
import dummyData from '../dummyData';

export default (serverConfig) => {
  mongoose.Promise = global.Promise;
  // MongoDB Connection
  mongoose.connect(serverConfig.mongoURL);
  // CONNECTION EVENTS
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${serverConfig.mongoURL}`);
  });
  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
  // feed some dummy data in DB.
  dummyData();
};

import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

export function connectDB(t, done) {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost:27017/mern-test', err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
}

export function dropDB(t) {
  mockgoose.helper.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
}

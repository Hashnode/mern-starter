import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export function connectDB(t) {
  mockgoose(mongoose).then(() => {
    mongoose.connect('mongodb://mockhost:1/mern-test', err => {
      if (err) t.fail('Unable to connect to test database');
    });
  });
}

export function dropDB(t) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
}

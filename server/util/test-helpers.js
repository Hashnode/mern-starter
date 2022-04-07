import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

export async function connectDB() {
  await mockgoose.prepareStorage();
  await /* TODO: JSFIX could not patch the breaking change:
  BREAKING CHANGE: mongoose.connect() returns a promise, removed MongooseThenable #5796 
  Suggested fix: Only relevant if you depend on the return value being a reference to the mongoose object. In that case, you need to modify the usages of the return value to get the mongoose object from somewhere else. */
  mongoose.connect('mongodb://localhost:27017/mern-test')
    .catch(() => 'Unable to connect to test database');
}

export async function dropDB() {
  await mockgoose.helper.reset()
    .catch(() => 'Unable to reset test database');
}

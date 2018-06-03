import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

export async function connectDB() {
  await mockgoose.prepareStorage();
  await mongoose.connect('mongodb://localhost:27017/mern-test')
    .catch(() => 'Unable to connect to test database');
}

export async function dropDB() {
  await mockgoose.helper.reset()
    .catch(() => 'Unable to reset test database');
}

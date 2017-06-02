import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  email: { type: 'String', required: true },
  name: { type: 'String', required: true },
  link: { type: 'String', required: false },
  provider: { type: 'String', required: false },
  picture: { type: 'Object', required: false },
  accessToken: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateLastVisited: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('User', userSchema);

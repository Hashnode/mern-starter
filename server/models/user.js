import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: 'String', required: true },
  name: { type: 'String', required: true },
  phone: { type: 'String', required: false },
  email: { type: 'String', required: false },
});

export default mongoose.model('User', userSchema);

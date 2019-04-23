import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  cuid: { type: String, required: true },
  post: { type: String, required: true },
  date: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Comment', commentSchema);

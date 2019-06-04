import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: { type: 'String', required: true },
  content: { type: 'String', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Comment', commentSchema);

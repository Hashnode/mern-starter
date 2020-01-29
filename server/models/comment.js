import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  cuid: { type: 'String', required: true },
  postId: { type: 'String', required: true },

  author: { type: 'String', required: true },
  content: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
}, {
});

export default mongoose.model('Comment', commentSchema);

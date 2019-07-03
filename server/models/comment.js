import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  postId: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Comment', postSchema);

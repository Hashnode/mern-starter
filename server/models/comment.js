import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  authorName: { type: 'String', required: true },
  comment: { type: 'String', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

export default mongoose.model('Comment', commentSchema);

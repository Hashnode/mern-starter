import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: 'String', required: true },
  content: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

export default mongoose.model('Comment', commentSchema);

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: 'String', required: true },
  author: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
}, { usePushEach: true });

export default mongoose.model('Comment', commentSchema);

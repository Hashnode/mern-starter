import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  post_id: { type: 'String', required: true },
  author: { type: 'String', required: true },
  text: { type: 'String', required: true },
});

export default mongoose.model('Comment', commentSchema);

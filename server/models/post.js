import mongoose from 'mongoose';
import Comment from './comment';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

postSchema.pre('remove', function cb(next) {
  Comment.deleteMany({ relatedPost: this.id }).exec();
  next();
});

export default mongoose.model('Post', postSchema);

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  dateAdded: { type: 'Date', default: Date.now, required: true },
}, { usePushEach: true });

export default mongoose.model('Post', postSchema);

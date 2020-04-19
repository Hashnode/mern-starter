import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  comments: {
    type: [{
      author: { type: 'String', required: true },
      text: { type: 'String', required: true },
      cuid: { type: 'String', required: true },
      createdAt: { type: 'Date', default: Date.now, required: true },
    }],
    default: [],
  },
});

export default mongoose.model('Post', postSchema);

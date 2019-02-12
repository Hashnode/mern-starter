import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    default: '',
    require: [true, 'Empty comments is not allowed.'],
  },
  author: {
    type: String,
    required: [true, 'Comment author is required.'],
  },
  created: {
    type: Date,
    default: () => Date.now(),
  },
  updated: {
    type: Date,
    default: () => Date.now(),
  },
  relatedPost: { type: Schema.Types.ObjectId, ref: 'Post', required: [true, 'Comment cannot exist without related post.'] },
});

module.exports = mongoose.model('Comment', commentSchema, 'comments');

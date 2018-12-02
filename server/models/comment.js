import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  author: String,
  text: String,
}, { timestamps: true });

export default mongoose.model('Comment', CommentsSchema);
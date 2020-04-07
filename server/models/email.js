import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema for email forms
const emailSchema = new Schema({
  to: { type: 'String', required: true },
  title: { type: 'String', required: true },
  body: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Email', emailSchema);

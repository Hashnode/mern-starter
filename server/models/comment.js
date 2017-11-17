import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: "String", required: true },
  body: { type: "String", required: true },
  cuid: { type: "String", required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  dateAdded: { type: "Date", default: Date.now, required: true }
});

export default mongoose.model("Comment", commentSchema);

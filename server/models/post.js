var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postSchema = new Schema({
  name: "String",
  title: "String",
  content: "String",
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
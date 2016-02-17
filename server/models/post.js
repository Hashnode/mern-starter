var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug : { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded : { type: 'Date', default: Date.now, required: true },
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;

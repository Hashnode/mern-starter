var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postSchema = new Schema({
  name: 'String',
  title: 'String',
  content: 'String',
  slug : 'String',
  dateAdded : { type: 'Date', default: Date.now, required: true },
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;

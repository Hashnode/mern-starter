var thinky = require('./thinky');
var type = thinky.type;

var Post = thinky.createModel('post', {
  id: type.string(),
  name: type.string().required(),
  title: type.string().required(),
  content: type.string().required(),
  slug: type.string().required(),
  cuid: type.string().required(),
  dateAdded: type.date().default(Date.now)
});

module.exports = Post;
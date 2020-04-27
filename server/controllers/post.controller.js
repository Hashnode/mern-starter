import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

export function addComment(req,res){
  if (!req.params.cuid || !req.body.userName ||!req.body.text) {
    res.status(403).end();
  }
  const {cuid } = req.body

  const comment = {
    _id:new Date(),
    userName:req.body.userName,
    text:req.body.text,
  }

  bulkUpdateOps.push({
    updateOne: {
      filter: { cuid },
      update: { $set: { comment } },
    }
  })

  Post.bulkWrite(bulkUpdateOps).exec((err, post)=>{
    if(err){
      res.status(500).send(err);
    }
    res.status(200).end();
  })
}

export function editComment(req,res){
  if (!req.params.cuid || !req.body.userName ||!req.body.text||!req.body._id) {
    res.status(403).end();
  }
  const {cuid,_id} = req.body
  const comment = {
    _id:_id,
    userName:req.body.userName,
    text:req.body.text,
  }
  Post.findOneAndUpdate({cuid,comment:{_id}},{comment},{upsert:true}).exec((err)=>{
    if(err){
      res.status(500).send(err);
    }
    res.status(200).end();
  })
}

export function deleteComment(req,res){
  if(!req.params.cuid||!req.body._id){
    res.status(403).end();
  }
  const {cuid,_id} = req.body
  Post.deleteOne({cuid,comment:{_id}}).exec((err)=>{
    if(err){
      res.status(500).send(err);
    }
    res.status(200).end();
  })

}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

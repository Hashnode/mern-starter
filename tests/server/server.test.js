const request = require('supertest');
const server = require('../../server');

test('Should load all posts', (done) => {
  request(server)
    .get('/api/posts')
    .then((response) => {
      console.log('Get All Posts returned: ' + response.statusCode);
      expect(response.statusCode).toBe(200);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    })
})

test('Should load a post by slug', (done) => {
  request(server)
    .get('/api/posts/hello-mern')
    .then((response) => {
      console.log('Post loaded: ' + response.body.title + ' by /api/posts/hello-mern');
      expect(response.statusCode).toBe(200);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    })
})

let postObj = new Object();
postObj['post'] = {
  'name': 'Kashish',
  'title': 'All cattos meow',
  'content': 'All doggos woof',
};

test('Should add a new post', (done) => {
  request(server)
    .post('/api/posts')
    .send(postObj)
    .then((response) => {
      console.log('Successfully Added Post with slug: ' + response.body.post.slug)
      expect(response.statusCode).toBe(200);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    })
})

test('Should delete post by slug', (done) => {
  request(server)
    .delete('/api/posts/all-cattos-meow')
    .then((response) => {
      console.log('Delete all-cattos-meow returned: ' + response.statusCode);
      expect(response.statusCode).toBe(200);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    })
})

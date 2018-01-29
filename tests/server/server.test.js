const request = require('supertest');
const server = require('../../server');

test('Should load all posts', (done) => {
  request(server).get('/api/posts')
    .then((response) => {
      console.log('Get All Posts returned ' + response.statusCode);
      expect(response.statusCode).toBe(200);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    })
})

test('Should load a post by slug', (done) => {
  request(server).get('/api/posts/hello-mern')
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

test('Should load all posts', (done) => {
  request(server).get('/api/posts')
    .then((response) => {
      console.log('Get All Posts returned ' + response.statusCode);
      expect(response.statusCode).toBe(200);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    })
})

test('Should load all posts', (done) => {
  request(server).get('/api/posts')
    .then((response) => {
      console.log('Get All Posts returned ' + response.statusCode);
      expect(response.statusCode).toBe(200);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    })
})

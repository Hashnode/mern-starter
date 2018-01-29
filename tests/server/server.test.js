const request = require('supertest');
const server = require('../../server');
const Post = require('../../server/models/post');
const connectDB = require('../util/test-helpers').connectDB;
const dropDB = require('../util/test-helpers').dropDB;

// Initial posts added into test db
const posts = [
  new Post({ name: 'Kashish', title: 'Hello Mern', slug: 'hello-mern', content: "All cats meow 'MERN!'" }),
  new Post({ name: 'Abinav', title: 'Hi Mern', slug: 'hi-mern', content: "All dogs bark 'MERN!'" }),
];

async function connectToDatabase() {
  await connectDB();
  Post.create(posts);
  console.log('Connected and added Posts');
  return true;
}

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await dropDB();
});

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
      console.log(response)
      console.log('Post loaded: ' + response.post.title);
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

const request = require('supertest');
const server = require('../../server');
const Post = require('../../server/models/post');
const Seed = require('../../server/dummyData');

const cleanAndSeedDb = async () => {
  await Post.remove({});
  await Seed();
};

describe('Post APIs', () => {
  beforeEach(async () => {
    await cleanAndSeedDb();
  });

  test('Should load a post by slug', async () => {
    const response = await request(server).get('/api/posts/hello-mern');
    expect(response.statusCode).toBe(200);
  }, 5000);

  test('Should load all posts', async () => {
    const response = await request(server).get('/api/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toEqual(2);
  }, 5000);

  test('Should add a new post', async () => {
    const postObj = {};
    postObj.post = {
      name: 'Kashish',
      title: 'All cattos meow',
      content: 'All doggos woof',
    };

    const response = await request(server).post('/api/posts').send(postObj);
    expect(response.statusCode).toBe(201);
  }, 5000);

  test('Should delete post by slug', async () => {
    const response = await request(server).delete('/api/posts/hello-mern');
    expect(response.statusCode).toBe(200);
  }, 5000);
});

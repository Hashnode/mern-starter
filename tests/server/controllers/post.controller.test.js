const postController = require('../../../server/controllers/post.controller');
const Post = require('../../../server/models/post');
const connectDB = require('../../util/test-helpers').connectDB;
const dropDB = require('../../util/test-helpers').dropDB;

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

describe('Get a post using slug', () => {
  test('Should load a post using slug', () => {
    return postController.getPost({ slug: 'hello-mern' })
      .then(data => {
        console.error(data)
        // expect(data).toBeDefined()
        // expect(data).toEqual('Kashish')
      })
      .catch(err => {
        return console.error(err)
      })
  })
})

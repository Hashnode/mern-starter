const postController = require('../../../server/controllers/post.controller');
const Post = require('../../../server/models/post');
const connectDB = require('../../util/test-helpers').connectDB;
const dropDB = require('../../util/test-helpers').dropDB;

// Initial posts added into test db
const posts = [
  new Post({ name: 'Kashish', title: 'Hello Mern', slug: 'hello-mern', content: "All cats meow 'MERN!'" }),
  new Post({ name: 'Abinav', title: 'Hi Mern', slug: 'hi-mern', content: "All dogs bark 'MERN!'" }),
];

beforeEach(() => {
  connectDB(() => {
    Post.create(posts, err => {
      if (err) {
        console.warn(err)
        return console.warn('Unable to create posts')
      }
    });
  })
}, 1000);

afterEach(() => {
  dropDB();
})

describe('Get all posts in mock db', () => {
  it('Should load 2 posts', () => {
    return postController.getPosts()
      .then(data => {
        expect(data).toBeDefined()
        expect(data.posts.length).toEqual(2)
      })
  })
})

// describe('Get a post using _id', () => {
//   it('Should load a post using _id', () => {
//     return postController.getPost({
//       params: {
//         _id: 2
//       }
//     })
//       .then(data => {
//         expect(data).toBeDefined()
//         expect(data.post.name).toEqual('Abinav')
//       })
//   })
// })

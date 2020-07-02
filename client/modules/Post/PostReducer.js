import { ADD_COMMENT, ADD_POST, ADD_POSTS, DELETE_POST, EDIT_COMMENT, DELETE_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [] };

export const testComments = [
  {
    id: 1,
    author: 'Admin',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\n' +
      'dolor quam autem quasi\nreiciendis et nam sapiente accusantium',
    dateAdded: '2020-06-29T19:06:21.827Z',
  },
  {
    id: 2,
    author: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\n' +
      'voluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
    dateAdded: '2020-06-29T19:06:21.827Z',
  },
  {
    id: 3,
    author: 'Nikita@garfield.biz',
    body: 'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\n' +
      'omnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione',
    dateAdded: '2020-06-29T19:06:21.827Z',
  },
  {
    id: 4,
    author: 'Admin',
    body: 'non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia ' +
      'voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati',
    dateAdded: '2020-06-29T19:06:21.827Z',
  },
];

const PostReducer = (state = initialState, action) => {
  let k = 0;

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      action.posts.forEach(post => { post.comments = testComments; }); // eslint-disable-line

      return {
        ...state,
        data: action.posts,
      };

    case DELETE_POST :
      return {
        ...state,
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case ADD_COMMENT:
      state.data.forEach(post => {
        if (post.cuid === action.payload.cuid) {
          post.comments.forEach(comment => {
            if (comment.id > k) k = comment.id;
          });
        }
      });

      state.data.forEach(post => {
        if (post.cuid === action.payload.cuid) {
          post.comments = [{ ...action.payload.comment, id: k + 1 }, ...post.comments]; // eslint-disable-line
        }
      });

      return {
        ...state,
        data: state.data,
      };

    case DELETE_COMMENT:
      state.data.forEach(post => {
        if (post.cuid === action.payload.cuid) {
          post.comments = post.comments.filter(comment => comment.id !== action.payload.id); // eslint-disable-line
        }
      });

      return {
        ...state,
        data: state.data,
      };

    case EDIT_COMMENT:
      state.data.forEach(post => {
        if (post.cuid === action.payload.cuid) {
          post.comments.forEach(comment => {
            if (comment.id === action.payload.id) {
              comment.body = action.payload.comment;  // eslint-disable-line
            }
          });
        }
      });

      return {
        ...state,
        data: state.data,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Get comments by cuid
export const getComments = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0].comments;

// Get author
export const getAuthor = state => state.app.author;

// Export Reducer
export default PostReducer;

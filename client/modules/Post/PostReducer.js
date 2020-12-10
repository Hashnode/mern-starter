import { ADD_COMMENT, ADD_COMMENTS, ADD_POST, ADD_POSTS, DELETE_COMMENT, DELETE_POST, EDIT_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [], comments: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        ...state,
        data: action.posts,
      };
    case ADD_COMMENT :
      return {
        ...state,
        comments: [action.comment, ...state.comments],
      };
    case ADD_COMMENTS :
      return {
        ...state,
        comments: action.comments,
      };

    case DELETE_POST :
      return {
        ...state,
        data: state.data.filter(post => post.cuid !== action.cuid),
      };
    case DELETE_COMMENT :
      return {
        ...state,
        comments: state.comments.filter(comment => comment.cuid !== action.cuid),
      };
    case EDIT_COMMENT :
      return {
        ...state,
        comments: state.comments.map((comment) => (comment.cuid === action.comment.cuid ? action.comment : comment)),
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

// Export Reducer
export default PostReducer;

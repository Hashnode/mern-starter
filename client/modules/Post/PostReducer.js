import { ADD_POST, ADD_POSTS, DELETE_POST, CREATE_COMMENT, EDIT_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [] };

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

    case DELETE_POST :
      return {
        ...state,
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case CREATE_COMMENT :
      return {
        ...state,
        data: state.data.map(item => item._id === action.post._id ? item = action.post : item),
      };

    case EDIT_COMMENT :
      return {
        ...state,
        data: state.data.map(item => item._id === action.post._id ? item = action.post : item),
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

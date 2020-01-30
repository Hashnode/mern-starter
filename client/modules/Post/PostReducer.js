import { ADD_POST, ADD_POSTS, DELETE_POST } from './PostActions';
import {
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
} from '../Comment/CommentsActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };
    case ADD_COMMENT_SUCCESS:
      return {
        data: state.data.map(post => {
          if (post && post.cuid === action.comment.postId) {
            return { ...post, comments: [...post.comments, action.comment] };
          }
          return post;
        }),
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        data: state.data.map(post => {
          if (post && post.cuid === action.comment.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.cuid === action.comment.cuid) {
                  return action.comment;
                }
                return comment;
              }),
            };
          }
          return post;
        }),
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        data: state.data.map(post => {
          if (post && post.cuid === action.comment.postId) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment.cuid !== action.comment.cuid) };
          }
          return post;
        }),
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

import {
  ADD_POST,
  ADD_POSTS,
  DELETE_POST,
  COMMENT_ADD,
  COMMENT_REMOVE,
  COMMENT_FORM_OPEN,
} from './PostActions';

// Post
// {
//   _id,
//   name,
//   title,
//   slug,
//   cuid,
//   content,
//   comments: [],
// }
// Initial State
const initialState = {
  data: [],
  addCommentForm: {
    isVisible: false,
    postId: '',
  },
};

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

    case COMMENT_FORM_OPEN :
      return {
        ...state,
        addCommentForm: {
          isVisible: true,
          postId: action.payload.postId,
        },
      };

    case COMMENT_ADD :
      return {
        ...state,
        data: state.data.map(post => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  authorName: action.payload.authorName,
                  comment: action.payload.comment,
                  postId: action.payload.postId,
                  _id: action.payload._id,
                },
              ],
            };
          }
          return post;
        }),
      };

    case COMMENT_REMOVE :
      return {
        ...state,
        data: state.data.map(post => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.filter(
                ({ _id }) => _id !== action.payload.commentId
              ),
            };
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
export const getPost = (state, cuid) => state.posts.data.filter(
  post => post.cuid === cuid
)[0];

// Export Reducer
export default PostReducer;

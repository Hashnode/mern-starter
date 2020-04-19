import { ADD_POST, ADD_POSTS, DELETE_POST,
  ADD_COMMENT_TO_POST, DELETE_COMMENT_FROM_POST, EDIT_POST_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [] };

const addPostComment = (data, comment, editPostId) => {
  const postIndex = data.findIndex(post => post.cuid === editPostId);
  const editedPost = { ...data[postIndex] };
  editedPost.comments.unshift(comment);
  return [
    ...data.slice(0, postIndex),
    editedPost,
    ...data.slice(postIndex + 1),
  ];
};

const editPostComment = (data, comment, editPostId) => {
  const postIndex = data.findIndex(post => post.cuid === editPostId);
  const post = data[postIndex];
  const commentIndex = post.comments.findIndex(elem => elem.cuid === comment.cuid);
  post.comments[commentIndex] = { ...comment, createdAt: post.comments[commentIndex].createdAt };
  const editedPost = { ...post };
  return [
    ...data.slice(0, postIndex),
    editedPost,
    ...data.slice(postIndex + 1),
  ];
};

const deletePostComment = (data, commentId, editPostId) => {
  const postIndex = data.findIndex(post => post.cuid === editPostId);
  const comments = data[postIndex].comments.filter(comment => comment.cuid !== commentId);
  const editedPost = { ...data[postIndex], comments };
  return [
    ...data.slice(0, postIndex),
    editedPost,
    ...data.slice(postIndex + 1),
  ];
};

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

    case ADD_COMMENT_TO_POST :
      return {
        data: addPostComment(state.data, action.comment, action.postId),
      };

    case EDIT_POST_COMMENT :
      return {
        data: editPostComment(state.data, action.comment, action.postId),
      };

    case DELETE_COMMENT_FROM_POST :
      return {
        data: deletePostComment(state.data, action.commentId, action.postId),
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

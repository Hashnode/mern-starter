import { ADD_POST, ADD_POSTS, ADD_SELECTED_POST, DELETE_POST } from './PostActions';

const initialState = { posts: [], post: null };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        posts: [{
          name: action.name,
          title: action.title,
          content: action.content,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id,
        }, ...state.posts],
        post: state.post };

    case ADD_POSTS :
      return {
        posts: action.posts,
        post: state.post,
      };

    case ADD_SELECTED_POST :
      return {
        post: action.post,
        posts: state.posts,
      };

    case DELETE_POST :
      return {
        posts: state.posts.filter((post) => post._id !== action.post._id),
      };

    default:
      return state;
  }
};

export default PostReducer;

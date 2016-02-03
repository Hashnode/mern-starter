import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], selectedPost: null };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST :
      return {
        posts: state.posts.concat({
          name: action.name,
          title: action.title,
          content: action.content,
        }) };

    case ActionTypes.CHANGE_SELECTED_POST :
      return {
        posts: state.posts,
        selectedPost: action.title,
      };
    default:
      return state;
  }
};

export default postReducer;

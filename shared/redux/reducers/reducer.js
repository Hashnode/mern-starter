import * as ActionTypes from '../constants/constants';

const initialState = { posts: [] };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST :
      return {
        posts: state.posts.concat({
          name: action.name,
          title: action.title,
          content: action.content,
        }) };
    default:
      return state;
  }
};

export default postReducer;

// Import Actions
import { TOGGLE_ADD_POST, SET_AUTHOR } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  author: null,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHOR:
      return {
        ...state,
        author: action.payload,
      };
    case TOGGLE_ADD_POST:
      return {
        ...state,
        showAddPost: !state.showAddPost,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default AppReducer;

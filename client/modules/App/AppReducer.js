// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_COMMENT } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddComment: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
        showAddComment: state.showAddComment,
      };
    case TOGGLE_ADD_COMMENT:
      return {
        showAddPost: state.showAddPost,
        showAddComment: !state.showAddComment,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
// Get showAddComment
export const getShowAddComment = state => state.app.showAddComment;
// Export Reducer
export default AppReducer;

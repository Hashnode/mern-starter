// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_COMMENT, TOGGLE_EDIT_COMMENT } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddComment: false,
  showEditComment: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case TOGGLE_ADD_COMMENT:
      return {
        ...state,
        showAddPost: false,
        showAddComment: !state.showAddComment,
        showEditComment: false,
      };
    case TOGGLE_EDIT_COMMENT:
      return {
        ...state,
        showAddPost: false,
        showAddComment: false,
        showEditComment: !state.showEditComment,
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
// Get showEditComment
export const getShowEditComment = state => state.app.showEditComment;

// Export Reducer
export default AppReducer;

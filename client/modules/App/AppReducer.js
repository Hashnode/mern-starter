// Import Actions
import {
  TOGGLE_ADD_POST,
  TOGGLE_ADD_COMMENT_MODAL,
  TOGGLE_EDIT_COMMENT_MODAL,
} from './AppActions';

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
        ...state,
        showAddPost: !state.showAddPost,
      };

    case TOGGLE_ADD_COMMENT_MODAL:
      return {
        ...state,
        showAddComment: !state.showAddComment,
      };

    case TOGGLE_EDIT_COMMENT_MODAL:
      return {
        ...state,
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

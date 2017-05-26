// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_LOGIN } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showLogin: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return {
        showLogin: !state.showLogin,
      };

    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getShowLogin = state => state.app.showLogin;

// Export Reducer
export default AppReducer;

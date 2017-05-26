// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_LOGIN, SIGN_IN, SIGN_OUT } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showLogin: false,
  profile: {},
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

    case SIGN_IN:
      return {
        showLogin: false,
        profile: action.profile,
      };

    case SIGN_OUT:
      return {
        profile: {},
      };

    default:
      return state;
  }
};

/* Selectors */

export const getShowAddPost = state => state.app.showAddPost;
export const getShowLogin = state => state.app.showLogin;
export const getProfile = state => state.app.profile;

// Export Reducer
export default AppReducer;

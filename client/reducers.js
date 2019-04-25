/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  form: reduxFormReducer,
});

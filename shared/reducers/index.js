import { combineReducers } from 'redux';

import PostReducer from './Post';

export default combineReducers({
  Post: PostReducer,
});

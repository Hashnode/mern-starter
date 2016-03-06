import post from './post';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  post,
  routing,
});

export default rootReducer;

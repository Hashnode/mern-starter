import blog from './blog';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  blog,
  routing,
});

export default rootReducer;

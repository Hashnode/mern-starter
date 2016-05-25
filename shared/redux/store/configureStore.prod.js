import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer';

export function configureStore(initialState = {}) {
  const enhancer = applyMiddleware(thunk);

  return createStore(rootReducer, initialState, enhancer);
}

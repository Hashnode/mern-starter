import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/reducer';
import thunk from 'redux-thunk';

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducer', () => {
      const nextReducer = require('../reducers/reducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}

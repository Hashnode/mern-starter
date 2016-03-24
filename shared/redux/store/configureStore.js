import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import sagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/reducer';
import sagas from '../sagas';
import DevTools from '../../container/DevTools/DevTools';

export function configureStore(initialState = {}) {
  let finalCreateStore;

  if (process.env.CLIENT) {
    finalCreateStore = compose(
      applyMiddleware(thunk, sagaMiddleware(...sagas)),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(thunk, sagaMiddleware(...sagas))(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducer', () => {
      const nextReducer = require('../reducers/reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

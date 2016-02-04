import { createStore } from 'redux';
import rootReducer from '../reducers/reducer';


export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../redux/reducers/reducer', () => {
  //     const nextReducer = require('../reducers')
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store;
}

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

const packages = [];

packages.push(thunk);

if (process.env.NODE_ENV === 'development') {
  packages.push(createLogger());
}

const middleware = applyMiddleware(...packages);

export default createStore(
  reducers,
  middleware,
);

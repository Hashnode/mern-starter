import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

const packages = [];

// Push middleware that you need for both development and production
packages.push(thunk);

if (process.env.NODE_ENV === 'development') {
  // Push the middleware that are specific for development
  packages.push(createLogger());
}

const middleware = applyMiddleware(...packages);

export default createStore(
  reducers,
  middleware,
);

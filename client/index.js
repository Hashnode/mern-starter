/* eslint no-unused-vars: 0 */
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import postReducer from '../shared/redux/reducers/reducer';
import { render } from 'react-dom';
import React from 'react';
import App from '../shared/container/App';
import PostListView from '../shared/container/PostListView/PostListView';
import PostDetailView from '../shared/container/PostDetailView/PostDetailView';
import { Router, browserHistory, Route, IndexRoute, match } from 'react-router';
import routes from '../shared/routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';

const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;

render((
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
      )
     , document.getElementById('root'));

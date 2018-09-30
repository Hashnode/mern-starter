/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Team/pages/TeamListPage/TeamListPage');
  require('./modules/Survey/pages/SurveyPage/SurveyPage');
}

// react-router setup with code-splitting
// More info: https://mxstbr.blog/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Survey/pages/SurveyPage/SurveyPage').default);
        });
      }}
    />
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
    <Route
      path="/teams/"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Team/pages/TeamListPage/TeamListPage').default);
        });
      }}
    />
    <Route
      path="/posts/"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/admin/"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Admin/pages/Login/Login').default);
        });
      }}
    />
    <Route
      path="/survey/"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Survey/pages/SurveyPage/SurveyPage').default);
        });
      }}
    />
    <Route
      path="/admin/userlist"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Admin/pages/UserList/UserList').default);
        });
      }}
    />
    <Route
      path="/admin/adduser"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Admin/pages/UserList/AddUser').default);
        });
      }}
    />
  </Route>
);

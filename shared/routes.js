/* eslint no-unused-vars:0 */
import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import PostListView from './container/PostListView/PostListView';
import PostDetailView from './container/PostDetailView/PostDetailView';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={PostListView} />
    <Route path="/post/:title" component={PostDetailView}/>
  </Route>
);


export default routes;

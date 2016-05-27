import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './modules/App/App';
import PostListPage from './modules/Post/pages/PostListPage/PostListPage';
import PostDetailPage from './modules/Post/pages/PostDetailPage/PostDetailPage';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={PostListPage} />
    <Route path="/post/:slug" component={PostDetailPage}/>
  </Route>
);

export default routes;

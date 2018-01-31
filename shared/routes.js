import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './containers/Feed';
import PostView from './containers/PostView';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/:slug" component={PostView} />
  </Switch>
);

export default Routes;

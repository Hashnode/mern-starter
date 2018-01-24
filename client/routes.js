import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './containers/Feed';
import PostView from './containers/PostView';

const App = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/:id" component={PostView} />
  </Switch>
);

export default App;

import React from 'react';
import routes from '../shared/routes';
import DevTools from '../shared/container/DevTools/DevTools';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { configureStore } from '../shared/redux/store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;
const dest = document.getElementById('root');

let toRender;

if(process.env.CLIENT && !window.devToolsExtension) {
  toRender =   <Provider store={store}>
                <div>
                  <Router history={history} routes={routes} />
                  <DevTools />
                </div>
              </Provider> ;
}

else {
  toRender =   <Provider store={store}>
                <Router history={history} routes={routes} />
              </Provider> ;
}

render(toRender, dest);


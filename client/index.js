/* eslint no-unused-vars: 0 */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import postReducer from '../shared/redux/reducers/reducer';
import { render } from 'react-dom';
import React from 'react';
import App from '../shared/container/App';
import PostCreateView from '../shared/components/PostCreateView/PostCreateView';
const store = createStore(postReducer);

render(<Provider store={store}>
        <App />
       </Provider>
     , document.getElementById('root'));

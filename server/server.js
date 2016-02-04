import express from 'express';
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var path = require('path');
var bodyParser = require('body-parser');

var React = require('react');
import { configureStore } from '../shared/redux/store/configureStore';
import * as Actions from '../shared/redux/actions/actions';
import { Provider } from 'react-redux';

import { renderToString } from 'react-dom/server'
import createLocation from 'history/lib/createLocation';
import { match, RouterContext, createRoutes } from 'react-router';
var config = require('../webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

import routes from '../shared/routes';
import { fetchComponentDataBeforeRender } from './lib/fetchData';

const app = new express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


var Post = require('./models/post');

mongoose.connect('mongodb://localhost:27017/mern-starter', function(err, con){
  console.log('got connected?', con, err)
});

app.use(bodyParser.json({limit : '20mb'}))
app.use(bodyParser.urlencoded({ limit : '20mb', extended: false }))
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/addPost', function(req, res, next){
  console.log(req.body, 'bofy');
  var newPost = new Post(req.body.post);
  newPost.save(function(err, saved){
  	res.json({post: saved});
  });
});

app.get('/api/getPosts', function(req, res, next){
  Post.find().exec(function(err, posts){
  	res.json({posts: posts});
  });
});

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve('./index.html'));
// });

const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
}

// class MyComponent extends React.Component {
//   render() {
//     return <div>Hello World</div>;
//   }
// }

// import { Route, IndexRoute } from 'react-router';
// import App from '../dummyApp/App';
// import About from '../dummyApp/About';
// import Home from '../dummyApp/Home';


// const dummyroutes = (
//   <Route path="/" component={App} >
//     <IndexRoute component={Home} />
//     <Route path="/about" component={About}/>
//   </Route>
// );


app.use(function(req, res){

  match({routes, location: req.url }, (err, redirectLocation, renderProps) => {

    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found!');

    const initialState = {posts: [{name: "Mayank", title: "ReduxIso", content: "Redux Isomorphic App"}]};

    const store = configureStore(initialState);

    // const InitialView = renderToString(
    //   <Provider store={store}>
    //       <RouterContext {...renderProps} />
    //   </Provider>
    // );
    store.dispatch(Actions.fetchPosts()).then(() =>fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
          .then(html => {
            const initialView = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            const finalState = store.getState();
            res.status(200).end(renderFullPage(initialView, finalState))
          })
          .catch(err => {
            console.log(err)
            res.end(renderFullPage("",{}))
          }));


    //res.status(200).end(renderFullPage(InitialView, initialState));



  });

});

app.listen(8000, (error) => {
  console.log(error)
});

![](http://res.cloudinary.com/hashnode/image/upload/w_200/v1455647564/static_imgs/mern/imgs/favicon-mern.png)

# mern-starter
![title](https://travis-ci.org/Hashnode/mern-starter.svg?branch=v2.0.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


MERN is a scaffolding tool which makes it easy to build isomorphic apps using Mongo, Express, React and NodeJS. It minimizes the setup time and gets you up to speed using proven technologies.

- [Website](http://mern.io)
- [Documentation](http://mern.io/documentation.html)
- [Discussions](https://hashnode.com/n/mern)

## Quickstart

```
  npm install -g mern-cli
  mern init your_new_app
  cd your_new_app
  npm install
  npm start
```

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/).

## File Structure

### Webpack Configs

MERN uses Webpack for bundling modules. There are three types of Webpack configs provided `webpack.config.dev.js` (for development), `webpack.config.prod.js` (for production) and `webpack.config.server.js` (for bundling server in production).

The Webpack configuration is minimal and beginner-friendly. You can customize and add more features to it for production build.

### Server

MERN uses express web framework. Our app sits in server.js where we check for NODE_ENV.

If NODE_ENV is development we apply Webpack middlewares for bundling and Hot Module Replacement.

#### Server Side Rendering

We use React Router's match function for handling all page requests so that browser history works.

All the routes are defined in `client/routes.js`. React Router renders components according to route requested.

```js
// Server Side Rendering based on routes matched by React-router.
app.use((req, res) => {
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) {
            return res.status(404).end('Not found!');
        }

        const initialState = {
            posts: [],
            post: {}
        };

        const store = configureStore(initialState);

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params).then(() => {
            const initialView = renderToString(
                <Provider store = {store} >
                  <RouterContext {...renderProps}/>
                </Provider>
            );

            const finalState = store.getState();

            res.status(200).end(renderFullPage(initialView, finalState));
        }).catch(() => {
            res.end(renderFullPage('Error', {}));
        });
    });
});
```

`match` takes two parameters, first is an object that contains routes, location and history and second is a callback function which is called when routes have been matched to a location.

If there's an error in matching we return 500 status code, if no matches are found we return 404 status code. If a match is found then we need to create a new Redux Store instance.

**Note:** A new Redux Store is populated afresh on every request.

`fetchComponentData` is the key function. It takes three params : first is a dispatch function of Redux store, second is an array of components that should be rendered in current route and third is the route params. `fetchComponentData` collects all the needs (need is an array of actions that are required to be dispatched before rendering the component) of components in the current route. It returns a promise when all the required actions are dispatched. We render the page and send data to client for client-side rendering in `window.__INITIAL_STATE__`.

### Client

Client directory contains all the  shared components, routes, modules.

#### components
This folder contains all the shared components which is used throughout the project.

#### index.js
Index.js simply does client side rendering using the data provided from `window.__INITIAL_STATE__`.

#### assets
All the assets images, fonts goes here. All of these will be copied to `dist` folder while running in production and served from there.

#### modules
Modules are way of organising different domain specific modules in the project. A typical module contains the following
```
| - Post
  | - __tests__ // all the tests for this module goes here
      | - components // Sub components of this module
          | - Post.spec.js
          | - PostList.spec.js
          | - PostItem.spec.js
          | - PostImage.spec.js
      | - pages
          | - PostPage.spec.js
          | - PostViewPage.spec.js
      | - PostReducer.spec.js
      | - PostActions.spec.js
  | - components // Sub components of this module
      | - Post.js
      | - PostList.js
      | - PostItem.js
      | - PostImage.js
  | - pages // React Router Pages from this module
      | - PostPage
          | - PostPage.js
          | - PostPage.css
      | - PostViewPage
          | - PostViewPage.js
          | - PostViewPage.css
  | - PostReducer.js
  | - PostActions.js
```

## Misc

### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.

## Roadmap

The roadmap discussion thread for v2.0.0 can be found [here](https://github.com/Hashnode/mern-starter/issues/146).

## License
MERN is released under the [MIT License](http://www.opensource.org/licenses/MIT).

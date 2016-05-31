import App from './modules/App/App';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
}
function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

// React Router with code-splitting
// More Info: https://medium.com/modus-create-front-end-development/automatic-code-splitting-for-react-router-w-es6-imports-a0abdaa491e9
export default {
  component: App,
  childRoutes: [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        System.import('./modules/Post/pages/PostListPage/PostListPage')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/post/:slug',
      name: 'post-detail',
      getComponent(nextState, cb) {
        System.import('./modules/Post/pages/PostDetailPage/PostDetailPage')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ],
};

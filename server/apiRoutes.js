import { Router } from 'express';
const router = new Router();

router.use(require('./routes/post.routes').default);

router.route('/test/hot').get((req, res) => {
  res.json({date: `✅  Date: <strong>${new Date()}</strong>`});
});

export default router;

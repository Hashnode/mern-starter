import commentRoutes from './comment.routes';
import postRoutes from './post.routes';
import { Router } from 'express';
const router = new Router();

router.use(commentRoutes);
router.use(postRoutes);

export default router

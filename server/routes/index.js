"use strict";
import {Router} from 'express';
import postRouter from "./post.routes"
import commentRouter from "./comment.routes";
const router = new Router();


router.use("/posts", postRouter);
router.use("/comments", commentRouter);

export  default router;

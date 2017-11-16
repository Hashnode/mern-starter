import { Router } from "express";
import * as CommentController from "../controllers/comment.controller";
const router = new Router();

// Get all Comments
router.route("/posts/:cuid/comments").get(CommentController.getComments);

// Add a new Post
router.route("/posts/:cuid/comments").post(CommentController.addComment);

// Delete a post by cuid
router
  .route("/posts/:cuid/comments/:cuid")
  .delete(CommentController.deleteComment);

export default router;

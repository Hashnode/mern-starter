import { Router } from "express";
import * as CommentController from "../controllers/comment.controller";
const router = new Router();

// Get all Comments
router.route("/posts/:cuid/comments").get(CommentController.getComments);

// Add a new Comment
router.route("/posts/:cuid/comments").post(CommentController.addComment);

// Update a Comment
router.route("/comments/:cuid").put(CommentController.updateComment);

// Delete a comment by cuid
router.route("/comments/:cuid").delete(CommentController.deleteComment);

export default router;

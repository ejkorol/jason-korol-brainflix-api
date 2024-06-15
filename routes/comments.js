import express from "express";

import {
  postComment,
  deleteComment
} from "../controllers/commentsController.js";

const commentRouter = express.Router();

commentRouter
  .route("/:videoId/comments")
  .post(postComment);

commentRouter
  .route("/:videoId/comments/:commentId")
  .delete(deleteComment);

export default commentRouter;

import express from "express";

import {
  postComment,
  likeComment,
  deleteComment
} from "../controllers/commentsController.js";

const commentRouter = express.Router();

commentRouter
  .route("/:videoId/comments")
  .post(postComment);

commentRouter
  .route("/:videoId/comments/:commentId")
  .patch(likeComment)
  .delete(deleteComment);

export default commentRouter;

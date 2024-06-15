import {
  postComment as postCommentService,
  deleteComment as deleteCommentService
} from "../services/commentService.js";

export const postComment = (req, res) => {
  const { videoId } = req.params;
  const { name, comment } = req.body;

  try {
    const newComment = postCommentService(videoId, name, comment);
    res.status(201).json(newComment);
  } catch (e) {
    res.status(404).send(e.message);
  };
};

export const deleteComment = (req, res) => {
  const { videoId, commentId } = req.params;

  try {
    const deletedComment = deleteCommentService(videoId, commentId);
    res.json(deletedComment);
  } catch (e) {
    res.status(404).send(e.message);
  };
};

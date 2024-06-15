import express from "express";

import {
  getAllVideosData,
  getVideoList,
  postVideo,
  getVideoById,
  deleteVideoById
} from "../controllers/videosController.js";

const videoRouter = express.Router();

videoRouter
  .route("/all")
  .get(getAllVideosData);

videoRouter
  .route("/")
  .get(getVideoList)
  .post(postVideo);

videoRouter
  .route("/:videoId")
  .get(getVideoById)
  .delete(deleteVideoById);

export default videoRouter;

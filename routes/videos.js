import express from "express";
import upload from "../middlewares/upload.js";

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
  .post(upload, postVideo);

videoRouter
  .route("/:videoId")
  .get(getVideoById)
  .delete(deleteVideoById);

export default videoRouter;

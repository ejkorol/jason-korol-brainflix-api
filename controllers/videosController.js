import {
  getAllVideosData as getAllVideosDataService,
  getVideoList as getVideoListService,
  postVideo as postVideoService,
  getVideoById as getVideoByIdService,
  deleteVideoById as deleteVideoByIdService
} from "../services/videoService.js";

export const getAllVideosData = (_req, res) => {
  const videoData = getAllVideosDataService();
  res.json(videoData);
};

export const getVideoList = (_req, res) => {
  const videoData = getVideoListService();
  res.json(videoData);
};

export const postVideo = (req, res) => {
  const { title, channel, description } = req.body;
  const imageFile = req.file.filename;
  const newVideoDetailsEntry = postVideoService({ title, channel, imageFile, description });
  res.json(newVideoDetailsEntry);
};

export const getVideoById = (req, res) => {
  const { videoId } = req.params;
  const foundVideo = getVideoByIdService(videoId);
  if (foundVideo) {
    res.status(302).json(foundVideo);
  } else {
    res.status(404).send("No video by that id exists.");
  };
};

export const deleteVideoById = (req, res) => {
  const { videoId } = req.params;
  const deletedVideo = deleteVideoByIdService(videoId);
  if (deletedVideo) {
    res.status(205).json(deletedVideo);
  } else {
    res.status(404).send("No video by that id exists.");
  };
};

import {
  getAllVideosData as getAllVideosDataService,
  getVideoList as getVideoListService,
  postVideo as postVideoService,
  getVideoById as getVideoByIdService,
  deleteVideoById as deleteVideoByIdService
} from "../services/videoService.js";

export const getAllVideosData = (_req, res) => {
  const videoData = getAllVideosDataService();
  if (videoData) {
    res.json(videoData);
  } else {
    res.status(500).send("JSON file not formatted correctly")
  };
};

export const getVideoList = (_req, res) => {
  try {
    const videoData = getVideoListService();
    res.json(videoData);
  } catch (e) {
    res.status(404).send(e.message);
  };
};

export const postVideo = (req, res) => {
  const { title, channel, description } = req.body;
  const imageFile = req.file.filename;
  try {
    const newVideoDetailsEntry = postVideoService({ title, channel, imageFile, description });
    res.json(newVideoDetailsEntry);
  } catch (e) {
    res.status(500).send(e.message);
  };
};

export const getVideoById = (req, res) => {
  const { videoId } = req.params;
  try {
    const foundVideo = getVideoByIdService(videoId);
    res.status(200).json(foundVideo);
  } catch (e) {
    res.status(404).send(e.message);
  };
};

export const deleteVideoById = (req, res) => {
  const { videoId } = req.params;
  try {
    const deletedVideo = deleteVideoByIdService(videoId);
    res.status(205).json(deletedVideo);
  } catch (e) {
    res.status(404).send(e.message);
  };
};

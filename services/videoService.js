import uuid from "../utils/functions/generateIds.js";
import readData from "../utils/functions/readData.js";
import writeData from "../utils/functions/writeData.js";

export const getAllVideosData = () => {
  return readData();
};

export const getVideoList = () => {
  const videoData = readData();
  return videoData.videoList;
};

export const postVideo = (videoDetails) => {
  const timestamp = Date.now();
  const id = uuid();
  const videoData = readData();

  const newVideoListEntry = {
    id,
    ...videoDetails // <= thank you george
  };

  const newVideoDetailsEntry = {
    id,
    ...videoDetails,
    views: 0,
    likes: 0,
    duration: 0,
    timestamp,
    comments: []
  };

  videoData.videoList.push(newVideoListEntry);
  videoData.videoDetails.push(newVideoDetailsEntry);
  writeData(videoData);

  return newVideoDetailsEntry;
};

export const getVideoById = (videoId) => {
  const videoData = readData();
  const foundVideo = videoData.videoDetails.find(video => video.id === videoId);
  return foundVideo;
};

export const deleteVideoById = (videoId) => {
  const videoData = readData();
  const foundVideoIndex = videoData.videoDetails.findIndex(video => video.id === videoId);

  if (foundVideoIndex !== -1) {
    const [deletedVideo] = videoData.videoList.splice(foundVideoIndex, 1);
    videoData.videoDetails.splice(foundVideoIndex, 1);
    writeData(videoData);
    return deletedVideo;
  };

  return null;
};

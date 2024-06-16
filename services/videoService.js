import fs from "fs";
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

export const postVideo = ({ title, channel, imageFile, description }) => {
  const timestamp = Date.now();
  const id = uuid();
  const videoData = readData();
  const UPLOAD_PATH = process.env.UPLOAD_PATH;

  const newVideoListEntry = {
    id,
    title,
    channel,
    image: `${UPLOAD_PATH}/${imageFile}`
  };

  const newVideoDetailsEntry = {
    id,
    title,
    channel,
    description,
    image: `${UPLOAD_PATH}/${imageFile}`,
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
  let foundVideoIndex = null;
  const foundVideo = videoData.videoDetails.find((video, index) => {
    video.id === videoId;
    foundVideoIndex = index;
    return video;
  });

  if (foundVideoIndex !== null) {
    fs.unlink(`${foundVideo.image}`, (e) => {
      if (e) {
        console.error(`Error occured: ${e}`);
      };
    });
    const [deletedVideo] = videoData.videoList.splice(foundVideoIndex, 1);
    videoData.videoDetails.splice(foundVideoIndex, 1);
    writeData(videoData);
    return deletedVideo;
  };

  return null;
};

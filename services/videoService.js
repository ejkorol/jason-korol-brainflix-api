import fs from "fs";
import uuid from "../utils/functions/generateIds.js";
import readData from "../utils/functions/readData.js";
import writeData from "../utils/functions/writeData.js";

export const getAllVideosData = () => {
  return readData();
};

export const getVideoList = () => {
  const videoData = readData();
  if (videoData) {
    return videoData.videoList;
  } else {
    throw new Error("No videos");
  };
};

export const postVideo = ({ title, channel, imageFile, description }) => {
  const timestamp = Date.now();
  const id = uuid();
  const videoData = readData();
  if (videoData.videoList && videoData.videoDetails) {
    const newVideoListEntry = {
      id,
      title,
      channel,
      image: `/images/${imageFile}`
    };

    const newVideoDetailsEntry = {
      id,
      title,
      channel,
      description,
      image: `/images/${imageFile}`,
      views: "0",
      likes: 0,
      duration: "",
      timestamp,
      comments: []
    };

    videoData.videoList.push(newVideoListEntry);
    videoData.videoDetails.push(newVideoDetailsEntry);
    writeData(videoData);

    return newVideoDetailsEntry;
  } else {
    throw new Error("JSON file not formatted correctly.");
  };
};

export const getVideoById = (videoId) => {
  const videoData = readData();
  const foundVideo = videoData.videoDetails.find(video => video.id === videoId);
  if (foundVideo) {
    return foundVideo;
  } else {
    throw new Error("Video not found");
  };
};

export const deleteVideoById = (videoId) => {
  const videoData = readData();
  const foundVideoIndex = videoData.videoDetails.findIndex(video => video.id === videoId);

  if (foundVideoIndex !== -1) {
    const foundVideo = videoData.videoDetails[foundVideoIndex];

    fs.unlink(`./public${foundVideo.image}`, (e) => {
      if (e) {
        console.error(`Error ${e}`);
      };
    });

    const [deletedVideo] = videoData.videoList.splice(foundVideoIndex, 1);
    videoData.videoDetails.splice(foundVideoIndex, 1);
    writeData(videoData);
    return deletedVideo;
  } else {
    throw new Error("Video not found");
  };
};

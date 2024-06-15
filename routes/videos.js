import express from "express";
import fs from "fs";
const filePath = "./data/videos.json";

const videoRouter = express.Router();

/* generate uuid */
function uuid() {
  return Math.random().toString(16).slice(2);
};

/* read file data */
function readData() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

/* write file data */
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

/* get all video data (debugging purposes) */
videoRouter
  .route("/all")

  /* get video (list), get video (details) */
  .get((_req, res) => {
    const videoData = readData();
    res.json(videoData);
  });

/* base routes */
videoRouter
  .route("/")

  /* get all videos (list) */
  .get((_req, res) => {
    const videosData = readData();
    res.json(videosData.videoList);
  })

  /* post new video to videoList and videoDetails */
  .post((req, res) => {
    const timestamp = Date.now();
    const id = uuid();
    const videoData = readData();
    const { title, channel, image, description } = req.body;
    const newVideoListEntry = {
      id: id,
      title: title,
      channel: channel,
      image: image,
      description: description
    };
    const newVideoDetailsEntry = {
      id: id,
      title: title,
      channel: channel,
      image: image,
      description: description,
      views: 0,
      likes: 0,
      duration: 0,
      timestamp: timestamp,
      comments: [],
    };
    videoData.videoList.push(newVideoListEntry);
    videoData.videoDetails.push(newVideoDetailsEntry);
    writeData(videoData);
    res.status(201).json(newVideoDetailsEntry);
  });

/* routes by id */
videoRouter
  .route("/:videoId")

  /* get video by id */
  .get((req, res) => {
    const { videoId } = req.params;
    const parsedVideosData = readVideos();
    const foundVideo = parsedVideosData.videoDetails.find((video) => {
      return video.id === videoId;
    });
    if (foundVideo) {
      res.status(302).json(foundVideo);
    } else {
      res.status(404).send("No video by that id exists.")
    };
  })

  /* delete video by id */
  .delete((req, res) => {
    const { videoId } = req.params;
    let videoData = readData();
    const foundVideo = videoData.videoList.find((video) => {
      return video.id === videoId;
    });
    if (foundVideo) {
      for (let i = 0; i < videoData.videoList.length; i++) {
        if (videoData.videoList[i].id === videoId) {
          videoData.videoList.splice(i, i + 1);
          videoData.videoDetails.splice(i, i + 1);
          writeData(videoData);
          res.status(205).json(foundVideo);
        } else {
          res.status(500).send("Something went wrong");
        };
      };
    } else {
      res.status(404).send("No video by that id exists.")
    };
  });

export default videoRouter;

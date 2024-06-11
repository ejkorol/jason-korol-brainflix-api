import express from "express";
import fs from "fs";
const videoRouter = express.Router();

const filePath = "./data/videos.json";

function uuid() {
  return Math.random().toString(16).slice(2);
};

const readVideos = () => {
  const videos = fs.readFileSync(filePath);
  return JSON.parse(videos);
};

videoRouter
  .route("/")

  .get((_req, res) => {
    const parsedVideosData = readVideos();
    res.json(parsedVideosData);
  })

  .post((req, res) => {
    const timestamp = new Date();
    const id = uuid();
    const parsedVideosData = readVideos();
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
    parsedVideosData.videoList.push(newVideoListEntry);
    parsedVideosData.videoDetails.push(newVideoDetailsEntry);
    fs.writeFileSync(filePath, JSON.stringify(parsedVideosData));
    res.status(201).json(newVideoDetailsEntry);
  })

videoRouter
  .route("/:videoId")

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

  .delete((req, res) => {
    const { videoId } = req.params;
    let parsedVideosData = readVideos();
    const foundVideo = parsedVideosData.videoList.find((video) => {
      return video.id === videoId
    })
    if (foundVideo) {
      for (let i = 0; i < parsedVideosData.videoList.length; i++) {
        if (parsedVideosData.videoList[i].id === videoId) {
          parsedVideosData.videoList.splice(i, i + 1);
          parsedVideosData.videoDetails.splice(i, i + 1);
          fs.writeFileSync(filePath, JSON.stringify(parsedVideosData));
          res.status(205).json(foundVideo);
        } else {
          res.status(500).send("Something went wrong");
        };
      };
    } else {
      res.status(404).send("No video by that id exists.")
    }
  });

export default videoRouter;

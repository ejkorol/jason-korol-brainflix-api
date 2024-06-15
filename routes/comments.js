import express from "express";
import fs from "fs";
const commentRouter = express.Router();

const filePath = "./data/videos.json";

/* generate uuid */
function uuid() {
  return Math.random().toString(16).slice(2);
};

/* read file data */
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

/* write file data */
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

/* get comments for video by video id */
commentRouter
  .route("/:videoId/comments")

  /* post new comment to video */
  .post((req, res) => {
    const { videoId } = req.params;
    const { name, comment } = req.body;
    const id = uuid();
    const timestamp = Date.now();
    const newComment = {
      name: name,
      comment: comment,
      id: id,
      timestamp: timestamp,
      likes: 0
    };
    let videoData = readData();
    let foundVideo = videoData.videoDetails.find((video) => {
      return video.id === videoId;
    });
    if (foundVideo) {
      foundVideo.comments.push(newComment);
      writeData(videoData);
      res.json(newComment);
    };
    res.status(404);
  });

/* comments by video id and comments by comment id */
commentRouter
  .route("/:videoId/comments/:commentId")

  /* delete a comment */
  .delete((req, res) => {
    const { videoId, commentId } = req.params;
    let videoData = readData();
    let foundVideo = videoData.videoDetails.find((video) => {
      return video.id === videoId;
    });
    if (foundVideo) {
      let foundCommentIndex = null;
      let foundComment = foundVideo.comments.find((comment, index) => {
        foundCommentIndex += index;
        return comment.id === commentId;
      });
      if (foundComment) {
        foundVideo.comments.splice(foundCommentIndex, foundCommentIndex+1);
        writeData(videoData);
        res.json(foundComment);
      } else {
        res.status(404).send("not ok, no comment");
      };
    } else {
      res.status(404).send("not ok");
    };
  });

export default commentRouter;

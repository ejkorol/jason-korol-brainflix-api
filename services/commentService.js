import uuid from "../utils/functions/generateIds.js";
import readData from "../utils/functions/readData.js";
import writeData from "../utils/functions/writeData.js";

export const postComment = (videoId, name, comment) => {
  const id = uuid();
  const timestamp = Date.now();
  const newComment = {
    id,
    name,
    comment,
    timestamp,
    likes: 0
  };

  let videoData = readData();
  let foundVideo = videoData.videoDetails.find(video => video.id === videoId);

  if (foundVideo) {
    foundVideo.comments.push(newComment);
    writeData(videoData);
    return foundVideo;
  };

  throw new Error("Video not found");
};

export const likeComment = (videoId, commentId) => {
  let videoData = readData();
  let foundVideo = videoData.videoDetails.find(video => video.id === videoId);

  if (foundVideo) {
    let foundComment = foundVideo.comments.find(comment => comment.id === commentId);
    if (foundComment) {
      foundComment.likes++;
      writeData(videoData);
      return foundComment;
    } else {
      throw new Error("Comment not found");
    };
  } else {
    throw new Error("Video not found");
  };
};

export const deleteComment = (videoId, commentId) => {
  let videoData = readData();
  let foundVideo = videoData.videoDetails.find(video => video.id === videoId);

  if (foundVideo) {
    let foundCommentIndex = foundVideo.comments.findIndex(comment => comment.id === commentId);
    if (foundCommentIndex !== -1) {
      const [deletedComment] = foundVideo.comments.splice(foundCommentIndex, 1);
      writeData(videoData);
      return deletedComment;
    } else {
      throw new Error("Comment not found");
    };
  } else {
    throw new Error("Video not found");
  };
};

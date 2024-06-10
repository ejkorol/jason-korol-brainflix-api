import express from "express";
const videoRouter = express.Router();

videoRouter
  .route("/")
  .get((_req, res) => {
    res.send("ok, videos")
  });

export default videoRouter;

import express from "express";
import cors from "cors";
import "dotenv/config";

import videoRoutes from "./routes/videos.js";

const PORT_ALT = 5051;
const PORT = process.env.PORT || PORT_ALT;

const api = express();

api.use(cors());
api.use(express.json());
api.use((req, _res, next) => {
  console.log("ok, incoming");
  console.log(req.query.api_key);
  next();
});

api.use("/videos", videoRoutes);

api.get("/", (_req, res) => {
  res.send("ok, root route");
});

api.listen(PORT, () => {
  console.log(`API Listening on port: ${PORT}`);
});

import express from "express";
import cors from "cors";
import "dotenv/config";

/* ROUTES */
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

const CORS_URL = process.env.CORS_URL;
const PORT_ALT = 5051;
const PORT = process.env.PORT || PORT_ALT;

const api = express();

/* ***************************** */
/*           MIDDLEWARE          */
/* ***************************** */

api.use(cors({ origin: CORS_URL }));
 
api.use(express.json());
api.use(express.static("public"));

api.use((req, res, next) => {
  if (req.query.api_key) {
    next();
  } else {
    res.status(401).send("Please have an API key present.")
  };
});

/* ***************************** */
/*             ROUTES            */
/* ***************************** */

api.use("/videos", videoRoutes);
api.use("/videos", commentRoutes);

api.get("/", (_req, res) => {
  res.send("ok, root route");
});

api.listen(PORT, () => {
  console.log(`API Listening on port: ${PORT}`);
});

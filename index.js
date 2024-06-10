import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT_ALT = 5051;
const PORT = process.env.PORT || PORT_ALT;

const api = express();

api.use(cors());

api.get("/", (_req, res) => {
  res.send("ok");
});

api.listen(PORT, () => {
  console.log(`API Listening on port: ${PORT}`);
});

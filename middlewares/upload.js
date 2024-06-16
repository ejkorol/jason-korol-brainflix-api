import multer from "multer";
import path from 'path';
import uuid from "../utils/functions/generateIds.js";

const UPLOAD_PATH = process.env.UPLOAD_PATH

const storage = multer.diskStorage({
  destination: UPLOAD_PATH,
  filename: (_req, file, callback) => {
    const imageId = uuid();
    const fileName = `image-${imageId}-${Date.now()}${path.extname(file.originalname)}`;
    callback(null, fileName);
  },
});

const upload = multer({
  storage: storage,
}).single('imageFile');

export default upload;

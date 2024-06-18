import express from "express";
import {uploadVideo} from "../../controller/video.js"
import {videoValidation} from "../../utils/validators/auth.js"
const videosRouter = express.Router();

videosRouter.post('/uploadVideo',videoValidation,uploadVideo)

export default videosRouter;
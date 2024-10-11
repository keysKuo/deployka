import express from "express";
import { catchAsync } from "../utils";
import { verifyAuth } from "../middlewares/auth.verify";
import UploadController from "../controllers/upload.controller";
const router = express.Router();


// router.use(catchAsync(verifyAuth));
router.post('/', catchAsync(UploadController.uploadRepo));

export default router;

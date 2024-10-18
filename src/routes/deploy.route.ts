import express from "express";
import { catchAsync } from "../utils";
import { verifyAuth } from "../middlewares/auth.verify";
import DeployController from "../controllers/deploy.controller";
const router = express.Router();


// router.use(catchAsync(verifyAuth));
router.post('/upload', catchAsync(DeployController.uploadRepo));
router.post('/build', catchAsync(DeployController.buildProject));
router.delete('/delete', catchAsync(DeployController.deleteProject));
router.post('/cancel', catchAsync(DeployController.cancelDeploy));

export default router;

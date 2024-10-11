import express from "express";
import { catchAsync } from "../utils";
import AuthController from "../controllers/auth.controller";
import { verifyAuth } from "../middlewares/auth.verify";
const router = express.Router();

router.post("/signUp", catchAsync(AuthController.signUp));
router.post('/signIn', catchAsync(AuthController.signIn));
router.post('/signInWithGoogle', catchAsync(AuthController.signInWithGoogle));

router.use(catchAsync(verifyAuth));
router.get('/protected', (req, res, next) => res.status(200).json({success: true, msg: 'Authenticated'}));
router.post('/logOut/:userId', catchAsync(AuthController.logOut));

export default router;

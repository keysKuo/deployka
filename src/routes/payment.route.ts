import express from "express";
import { catchAsync } from "../utils";
import { verifyAuth } from "../middlewares/auth.verify";
import PaymentController from "../controllers/payment.controller";
const router = express.Router();

router.post("/create-payment-session", catchAsync(PaymentController.createSession));


export default router;

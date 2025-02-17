import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import authRouter from "./auth.route";
import paymentRouter from './payment.route';
import deployRouter from './deploy.route';

router.use("/auth", authRouter);
router.use('/payment', paymentRouter);
router.use('/deploy', deployRouter);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json(`API Connected`);
});

export default router;

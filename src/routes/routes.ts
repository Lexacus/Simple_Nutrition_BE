import { Router } from "express";
import foodRoutes from "./foodRoutes";
import trackerRoutes from "./trackerRoutes";

const router = Router();

router.use("/foods", foodRoutes);
router.use("/tracker", trackerRoutes);

export default router;

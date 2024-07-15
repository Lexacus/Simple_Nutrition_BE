import { Router } from "express";
import foodRoutes from "./foodRoutes";

const router = Router();

router.use("/foods", foodRoutes);

export default router;

import { Router } from "express";
import {
  getTrackedDays,
  replaceTrackedDays,
} from "../controllers/trackerController";

const router = Router();

router.get("/", getTrackedDays);

router.post("/", replaceTrackedDays);

export default router;

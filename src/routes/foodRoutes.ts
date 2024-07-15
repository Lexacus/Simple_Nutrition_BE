import { Router } from "express";
import { getFoods, replaceFoods } from "../controllers/foodController";

const router = Router();

router.get("/", getFoods);

router.post("/", replaceFoods);

export default router;

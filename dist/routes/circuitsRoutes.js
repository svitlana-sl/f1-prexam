import { Router } from "express";
import { getCircuits } from "../controllers/circuitController";
const router = Router();
router.get("/", getCircuits);
export default router;

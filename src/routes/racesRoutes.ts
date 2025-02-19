import { Router } from "express";
import { getRaces } from "../controllers/raceController";

const router = Router();

router.get("/", getRaces);

export default router;

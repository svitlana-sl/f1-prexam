import { Router } from "express";
import { getDrivers } from "../controllers/driversController";

const router = Router();

router.get("/", getDrivers);

export default router;

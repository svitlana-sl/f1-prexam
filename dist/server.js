var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { notFound } from "./controllers/notFoundController";
import circuitsRoutes from "./routes/circuitsRoutes";
import driversRoutes from "./routes/driversRoutes";
import teamsRoutes from "./routes/teamRoutes";
import racesRoutes from "./routes/racesRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
// Variables
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/circuits", helloMiddleware, circuitsRoutes);
app.use("/api/drivers", helloMiddleware, driversRoutes);
app.use("/api/teams", helloMiddleware, teamsRoutes);
app.use("/api/races", helloMiddleware, racesRoutes);
app.all("*", notFound);
// Database connection
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(MONGO_URI);
        console.log("✅ Database connection OK");
    }
    catch (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1);
    }
});
// Start the server after DB connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
});

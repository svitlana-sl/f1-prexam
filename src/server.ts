// Imports
import "dotenv/config";
dotenv.config();
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
const MONGO_URI = process.env.MONGO_URI as string;

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
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connection OK");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
};

// Start the server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

import Circuit from "./models/Circuit";
import Driver from "./models/Driver";
import Race from "./models/Race";
import Team from "./models/Team";

const MONGO_URI = process.env.MONGO_URI!;

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding.");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const dataPath = path.join(__dirname, "data");
    if (!fs.existsSync(dataPath)) {
      throw new Error("❌ Data folder not found!");
    }

    const circuits = JSON.parse(
      fs.readFileSync(path.join(dataPath, "circuits.json"), "utf-8")
    );
    const drivers = JSON.parse(
      fs.readFileSync(path.join(dataPath, "drivers.json"), "utf-8")
    );
    const races = JSON.parse(
      fs.readFileSync(path.join(dataPath, "races.json"), "utf-8")
    );
    const teams = JSON.parse(
      fs.readFileSync(path.join(dataPath, "teams.json"), "utf-8")
    );

    await Circuit.deleteMany();
    await Driver.deleteMany();
    await Race.deleteMany();
    await Team.deleteMany();

    await Circuit.insertMany(circuits);
    await Driver.insertMany(drivers);
    await Race.insertMany(races);
    await Team.insertMany(teams);

    console.log("✅ Data Imported Successfully!");

    await mongoose.disconnect();
    console.log("✅ MongoDB connection closed.");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error with data import:", err);

    await mongoose.disconnect();
    process.exit(1);
  }
};

importData();

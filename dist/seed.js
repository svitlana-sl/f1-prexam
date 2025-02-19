var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const MONGO_URI = process.env.MONGO_URI;
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB for seeding.");
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const dataPath = path.join(__dirname, "data");
        if (!fs.existsSync(dataPath)) {
            throw new Error("❌ Data folder not found!");
        }
        const circuits = JSON.parse(fs.readFileSync(path.join(dataPath, "circuits.json"), "utf-8"));
        const drivers = JSON.parse(fs.readFileSync(path.join(dataPath, "drivers.json"), "utf-8"));
        const races = JSON.parse(fs.readFileSync(path.join(dataPath, "races.json"), "utf-8"));
        const teams = JSON.parse(fs.readFileSync(path.join(dataPath, "teams.json"), "utf-8"));
        yield Circuit.deleteMany();
        yield Driver.deleteMany();
        yield Race.deleteMany();
        yield Team.deleteMany();
        yield Circuit.insertMany(circuits);
        yield Driver.insertMany(drivers);
        yield Race.insertMany(races);
        yield Team.insertMany(teams);
        console.log("✅ Data Imported Successfully!");
        yield mongoose.disconnect();
        console.log("✅ MongoDB connection closed.");
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Error with data import:", err);
        yield mongoose.disconnect();
        process.exit(1);
    }
});
importData();

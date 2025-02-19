var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Race from "../models/Race";
import Driver from "../models/Driver";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
const getFlagUrl = (countryCode) => `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;
const formatTimePosition1 = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(3);
    return `${hours}:${minutes}:${seconds}`;
};
const formatTimePosition = (ms) => (ms / 1000).toFixed(3);
export const getRaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const format = req.query.format === "true";
        const races = yield Race.find().lean();
        const racesWithDetails = yield Promise.all(races.map((race) => __awaiter(void 0, void 0, void 0, function* () {
            const raceResults = yield Promise.all(race.race_results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
                const driver = yield Driver.findOne({
                    driver_id: result.driver_id,
                }).lean();
                let formattedTime = result.time;
                if (format) {
                    if (result.position === 1) {
                        formattedTime = formatTimePosition1(result.time);
                    }
                    else if (result.position === 2 || result.position === 3) {
                        formattedTime = formatTimePosition(result.time);
                    }
                }
                return Object.assign(Object.assign({}, result), { time: formattedTime, driver });
            })));
            return Object.assign(Object.assign({}, race), { race_results: raceResults, flag: race.countryCode
                    ? getFlagUrl(race.countryCode)
                    : undefined });
        })));
        res.status(200).json(racesWithDetails);
    }
    catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).json({ message: err.message });
        }
        else if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
});

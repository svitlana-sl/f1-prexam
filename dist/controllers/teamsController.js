var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Team from "../models/Team";
import Driver from "../models/Driver";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
const getFlagUrl = (countryCode) => `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;
export const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield Team.find().lean();
        const teamsWithDrivers = yield Promise.all(teams.map((team) => __awaiter(void 0, void 0, void 0, function* () {
            const drivers = yield Promise.all(team.drivers.map((d) => __awaiter(void 0, void 0, void 0, function* () {
                const driver = yield Driver.findOne({
                    driver_id: d.driver_id,
                }).lean();
                return Object.assign(Object.assign({}, d), { driver });
            })));
            return Object.assign(Object.assign({}, team), { drivers, flag: team.countryCode
                    ? getFlagUrl(team.countryCode)
                    : undefined });
        })));
        res.status(200).json(teamsWithDrivers);
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Driver from "../models/Driver";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
const getFlagUrl = (countryCode) => `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;
export const getDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        const query = search
            ? {
                $or: [
                    { givenName: { $regex: search, $options: "i" } },
                    { familyName: { $regex: search, $options: "i" } },
                ],
            }
            : {};
        const drivers = yield Driver.find(query).lean();
        const driversWithFlag = drivers.map((driver) => (Object.assign(Object.assign({}, driver), { flag: getFlagUrl(driver.countryCode) })));
        res.status(200).json(driversWithFlag);
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

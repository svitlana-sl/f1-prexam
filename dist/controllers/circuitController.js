var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Circuit from "../models/Circuit";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
export const getCircuits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        const query = search ? { name: { $regex: search, $options: "i" } } : {};
        const circuits = yield Circuit.find(query).lean();
        res.status(200).json(circuits);
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

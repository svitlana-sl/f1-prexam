import { Request, Response } from "express";
import Circuit from "../models/Circuit";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

export const getCircuits = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const circuits = await Circuit.find(query).lean();
    res.status(200).json(circuits);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.message });
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

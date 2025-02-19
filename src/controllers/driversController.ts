import { Request, Response } from "express";
import Driver from "../models/Driver";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

const getFlagUrl = (countryCode: string): string =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;

export const getDrivers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;

    const query = search
      ? {
          $or: [
            { givenName: { $regex: search, $options: "i" } },
            { familyName: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const drivers = await Driver.find(query).lean();

    const driversWithFlag = drivers.map((driver) => ({
      ...driver,
      countryCode: getFlagUrl(driver.countryCode),
    }));

    res.status(200).json(driversWithFlag);
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

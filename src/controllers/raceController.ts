import { Request, Response } from "express";
import Race from "../models/Race";
import Driver from "../models/Driver";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

const getFlagUrl = (countryCode: string): string =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;

const formatTimePosition1 = (ms: number): string => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(3);
  return `${hours}:${minutes}:${seconds}`;
};

const formatTimePosition = (ms: number): string => (ms / 1000).toFixed(3);

export const getRaces = async (req: Request, res: Response) => {
  try {
    const format = req.query.format === "true";
    const races = await Race.find().lean();

    const racesWithDetails = await Promise.all(
      races.map(async (race) => {
        const raceResults = await Promise.all(
          race.race_results.map(async (result) => {
            const driver = await Driver.findOne({
              driver_id: result.driver_id,
            }).lean();

            let formattedTime: string | number = result.time;
            if (format) {
              if (result.position === 1) {
                formattedTime = formatTimePosition1(result.time);
              } else if (result.position === 2 || result.position === 3) {
                formattedTime = formatTimePosition(result.time);
              }
            }
            return {
              ...result,
              time: formattedTime,
              driver,
            };
          })
        );

        return {
          ...race,
          race_results: raceResults,
          flag: (race as any).countryCode
            ? getFlagUrl((race as any).countryCode)
            : undefined,
        };
      })
    );

    res.status(200).json(racesWithDetails);
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

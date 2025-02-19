import { Request, Response } from "express";
import Team from "../models/Team";
import Driver from "../models/Driver";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

const getFlagUrl = (countryCode: string): string =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`;

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().lean();

    const teamsWithDrivers = await Promise.all(
      teams.map(async (team) => {
        const drivers = await Promise.all(
          team.drivers.map(async (d) => {
            const driver = await Driver.findOne({
              driver_id: d.driver_id,
            }).lean();
            return {
              ...d,
              driver: {
                ...driver,
                countryCode: driver?.countryCode
                  ? getFlagUrl(driver.countryCode)
                  : null,
              },
            };
          })
        );

        return {
          ...team,
          drivers,
        };
      })
    );

    res.status(200).json(teamsWithDrivers);
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

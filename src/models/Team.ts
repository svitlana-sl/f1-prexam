import { Schema, model, Document } from "mongoose";

export interface ITeamDriver {
  driver_id: string;
  position: number;
}

export interface ITeam extends Document {
  team_id: string;
  name: string;
  principal: string;
  base: string;
  founded_year: number;
  engine: string;
  drivers: ITeamDriver[];
  image: string;
}

const teamDriverSchema = new Schema<ITeamDriver>({
  driver_id: { type: String, required: true },
  position: { type: Number, required: true },
});

const teamSchema = new Schema<ITeam>({
  team_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  principal: { type: String, required: true },
  base: { type: String, required: true },
  founded_year: { type: Number, required: true },
  engine: { type: String, required: true },
  drivers: { type: [teamDriverSchema], required: true },
  image: { type: String, required: true },
});

export default model<ITeam>("Team", teamSchema);

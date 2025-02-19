import { Schema, model, Document } from "mongoose";

export interface IRaceResult {
  position: number;
  driver_id: string;
  time: number;
  points: number;
}

export interface IRace extends Document {
  round: number;
  circuit_id: string; // Можна створити референс до Circuit, але в JSON це string
  date: Date;
  sprint_race: boolean;
  fastest_lap: string; // driver_id наприклад
  race_results: IRaceResult[];
}

const raceResultSchema = new Schema<IRaceResult>({
  position: { type: Number, required: true },
  driver_id: { type: String, required: true },
  time: { type: Number, required: true },
  points: { type: Number, required: true },
});

const raceSchema = new Schema<IRace>({
  round: { type: Number, required: true },
  circuit_id: { type: String, required: true },
  date: { type: Date, required: true },
  sprint_race: { type: Boolean, required: true },
  fastest_lap: { type: String, required: true },
  race_results: { type: [raceResultSchema], required: true },
});

export default model<IRace>("Race", raceSchema);

import { Schema, model, Document } from "mongoose";

export interface ICircuit extends Document {
  circuit_id: string;
  name: string;
  image: string;
  location: {
    country: string;
    city: string;
  };
  length_km: number;
  turns: number;
}

const circuitSchema = new Schema<ICircuit>({
  circuit_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  length_km: { type: Number, required: true },
  turns: { type: Number, required: true },
});

export default model<ICircuit>("Circuit", circuitSchema);

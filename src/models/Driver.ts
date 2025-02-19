import { Schema, model, Document } from "mongoose";

export interface IDriver extends Document {
  driver_id: string;
  permanentNumber: string;
  code: string;
  countryCode: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;
  image: string;
}

const driverSchema = new Schema<IDriver>({
  driver_id: { type: String, required: true, unique: true },
  permanentNumber: { type: String, required: true },
  code: { type: String, required: true },
  countryCode: { type: String, required: true },
  url: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  image: { type: String, required: true },
});

export default model<IDriver>("Driver", driverSchema);

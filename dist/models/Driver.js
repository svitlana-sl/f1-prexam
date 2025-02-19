import { Schema, model } from "mongoose";
const driverSchema = new Schema({
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
export default model("Driver", driverSchema);

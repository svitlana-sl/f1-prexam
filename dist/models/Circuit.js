import { Schema, model } from "mongoose";
const circuitSchema = new Schema({
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
export default model("Circuit", circuitSchema);

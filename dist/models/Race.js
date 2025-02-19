import { Schema, model } from "mongoose";
const raceResultSchema = new Schema({
    position: { type: Number, required: true },
    driver_id: { type: String, required: true },
    time: { type: Number, required: true },
    points: { type: Number, required: true },
});
const raceSchema = new Schema({
    round: { type: Number, required: true },
    circuit_id: { type: String, required: true },
    date: { type: Date, required: true },
    sprint_race: { type: Boolean, required: true },
    fastest_lap: { type: String, required: true },
    race_results: { type: [raceResultSchema], required: true },
});
export default model("Race", raceSchema);

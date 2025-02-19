import { Schema, model } from "mongoose";
const teamDriverSchema = new Schema({
    driver_id: { type: String, required: true },
    position: { type: Number, required: true },
});
const teamSchema = new Schema({
    team_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    principal: { type: String, required: true },
    base: { type: String, required: true },
    founded_year: { type: Number, required: true },
    engine: { type: String, required: true },
    drivers: { type: [teamDriverSchema], required: true },
    image: { type: String, required: true },
});
export default model("Team", teamSchema);

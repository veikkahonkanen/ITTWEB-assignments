const mongoose = require("mongoose");
const exercise = require("./exercise").exerciseSchema;

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    userId: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    description: String,
    exercises: [exercise]
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;


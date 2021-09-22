const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutLogSchema = new Schema({
    userId: { type: mongoose.ObjectId, required: true, ref: "User" },
    workout: { type: mongoose.ObjectId, required: true, ref: "Workout" },
    timestamp: {type: Date, required: true}
});

const WorkoutLog = mongoose.model("WorkoutLog", workoutLogSchema);
module.exports = WorkoutLog;

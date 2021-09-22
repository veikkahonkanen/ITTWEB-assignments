const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    sets: { type: Number, required: true },
    durationType: { type: String, enum: ["time", "reps"], required: true},
    duration: {type: Number, required: true}
});

module.exports.Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports.exerciseSchema = exerciseSchema;

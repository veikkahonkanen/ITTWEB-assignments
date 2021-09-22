const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    userId: { type: mongoose.ObjectId, required: true },
    username : { type: String, required: true },
    timestamp: { type: Date, required: true },
    value: { type: Number, required: true }
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
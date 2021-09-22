const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    hash: { type: String, required: true }
});

userSchema.methods.setPassword = async function(password) {
    this.hash = await bcrypt.hash(password, saltRounds);;
}

userSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(password, this.hash);
}

userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 6); // JWT expires in 6 hours
    return jwt.sign({
        _id: this._id,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000), // as Unix time in seconds
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!};
}


const User = mongoose.model("User", userSchema);
module.exports = User;
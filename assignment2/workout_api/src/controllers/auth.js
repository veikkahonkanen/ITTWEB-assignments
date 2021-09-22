const User = require("../models/user");

module.exports.login = async function (req, res, next) {
    let user;
    try {

        user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(400).json({ "message": "User doesn't exist" });
        }
        const valid = await user.validPassword(req.body.password);
        if (!valid) {
            return res.status(400).json({ "message": "Incorrect password" });
        }
        return res.status(200).json({ "token": user.generateJwt() });
    }
    catch (err) {
        next(err);
    }
}

module.exports.registerUser = async function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400)
            .json({ "message": "Required fields" })
    }
    try {
        if(await User.exists({email: req.body.email})){
            return res.status(400).json({"message": "Email already exists"})
        }
        const user = new User({ email: req.body.email });
        const passwordPlain = req.body.password;
        await user.setPassword(passwordPlain);
        await user.save();
        return res.send(user);
    }
    catch (err) {
        next(err);
    }
}

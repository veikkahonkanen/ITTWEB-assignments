const Score = require('../models/score');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const { BehaviorSubject } = require('rxjs');

const lastTopNSubject = new BehaviorSubject([]);

module.exports.getScores = async function(req, res, next) {
    try {
        const scores = await Score.find({}).sort({ value: 'desc'}).exec();
        res.send(scores);
    } catch(err) {
        next(err);
    }
}

module.exports.getTopNScores = async function(n) {
    if (lastTopNSubject.value.length === 0) {
        const scores = await Score.find({}).sort({ value: 'desc'}).exec();
        var lastTopN = scores.slice(0, n)
            .map((s) => s = { username: s.username, score: s.value});
        lastTopNSubject.next(lastTopN);
    }
    return lastTopNSubject.asObservable();
}

module.exports.createScore = async function(req, res, next) {
    if (!req.user._id || !req.body.timestamp || !req.body.value) {
        return res.status(400).json({ 'message': "Score needs the following" + 
        "params: userId, timestamp, value!" });
    } else {
        try {
            if (await Score.exists({ userId: req.user_id, 
                timestamp: req.body.timestamp })) {
                return res.status(400).json({ 'message': "Score record for the" +
                " user and the timestamp already exists! (Possible duplicate)"});
            }
            const username = await User.findById(req.user._id);

            const score = new Score({
                userId: req.user._id,
                username: username.name,
                timestamp: req.body.timestamp,
                value: req.body.value
            });
            await score.save();

            // update the latest high scores
            var lastTopN = lastTopNSubject.value;
            console.log(lastTopN);
            console.log(lastTopN[lastTopN.length-1].score);
            if (lastTopN.length === 0) {
                lastTopN.push({ name: score.username, value: score.value });
                lastTopNSubject.next(lastTopN);
            } else if (score.value > lastTopN[lastTopN.length-1].score) {
                console.log("bigger score");
                lastTopN.push({ username: score.username, score: score.value });
                lastTopN.sort((x, y) => y.score - x.score);
                lastTopN = lastTopN.slice(0, 10);
                console.log(lastTopN);
                lastTopNSubject.next(lastTopN);
            } else {
                console.log(lastTopN);
            }
            res.send(score);
        } catch(err) {
            return next(err);
        }
    }
}

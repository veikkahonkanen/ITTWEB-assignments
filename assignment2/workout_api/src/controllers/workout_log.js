const WorkoutLog = require("../models/workout_log");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getWorkoutLogs  = async function(req,res,next){
    try{
        const userWorkouts = await WorkoutLog.find({"userId": req.user._id})
        .populate("workout")
        .sort({timestamp: -1})
        .exec();
        res.send(userWorkouts);    
    }
    catch(err){
        next(err);
    }
}


module.exports.createWorkoutLog = async function(req,res, next){
    if(!req.body.timestamp || !req.body.workoutId){
        return res.status(400).json({ "message": "Log needs a timestamp and a workoutId" });
    }
    else{
        try{
            const workout = new WorkoutLog({timestamp: req.body.timestamp, workout: req.body.workoutId, userId: req.user._id});
            await workout.save();
            res.send(workout);
        }
        catch(err){
            return next(err);
        }
    }
}

const { Exercise } = require("../models/exercise");
const Workout = require("../models/workout");
const WorkoutLog = require("../models/workout_log");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getWorkouts  = async function(req,res,next){
    try{
        let top = req.query.top;
        let findParams = {};
        if(!!top){
            const workoutLogs = await getTopWorkouts(parseInt(top));
            findParams = {_id: {$in: workoutLogs.map(w => w._id)}};
        }
        
        var usersProjection = { 
            exercises: false
        };
        const userWorkouts = await Workout.find(findParams, usersProjection).exec();
        res.send(userWorkouts);    
    }
    catch(err){
        next(err);
    }
}

async function getTopWorkouts(top){
        const count = await WorkoutLog.aggregate(
            [
                //Group pipeline
                {$group: { 
                    _id: "$workout", 
                    count: {$sum: 1}
                }},
                //Sorting pipeline
                {$sort: { count:-1}},
                //Limit pipeline
                {$limit: top}
            ]);
    return count;    
}

module.exports.getWorkout = async function(req, res, next){
    try{
        if(!ObjectId.isValid(req.params.workoutId) || !await Workout.exists({_id: req.params.workoutId})){
            return res.status(404).json({"message": "Workout not found"})
        }
        const workout = await Workout.findById(req.params.workoutId);
        res.send(workout);
    }
    catch(err){
        next(err);
    }
}


module.exports.createWorkout = async function(req,res, next){
    if(!req.body.name){
        return res.status(400).json({ "message": "Workout needs a name" });
    }
    else{
        try{
            if(await Workout.exists({name: req.body.name})){
                return res.status(400).json({"message": "Workout name already exists"})
            }
            const workout = new Workout({name: req.body.name, description: req.body.description, userId: req.user._id});
            await workout.save();
            res.send(workout);
        }
        catch(err){
            return next(err);
        }
    }
}

module.exports.createExercise = async function(req, res, next){
    if (!req.body.name || !req.body.description || !req.body.sets || !req.body.duration) {
        return res.status(400).json({ "message": "Fill all the required parameters" });
    }
    else{
        try{
            const exercise = new Exercise({
                                            name: req.body.name,
                                            description: req.body.description,
                                            sets: req.body.sets,
                                            durationType: req.body.durationType,
                                            duration: req.body.duration
                                            });
            const workout = await Workout.findById(req.params.workoutId);
            await workout.exercises.push(exercise);
            await workout.save();
            res.send(workout);
        }
        catch(err){
            return next(err);
        }
    }
}

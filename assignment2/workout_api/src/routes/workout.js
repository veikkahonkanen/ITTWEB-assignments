const express = require('express');
const workoutController = require('../controllers/workout');
const jwt = require('express-jwt');

const router = express.Router();
var jwtauth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })


router.route("/:workoutId")
    .get(workoutController.getWorkout)
    .post(jwtauth, workoutController.createExercise);
router.route("/")
    .get(workoutController.getWorkouts)
    .post(jwtauth, workoutController.createWorkout);
    
module.exports = router;
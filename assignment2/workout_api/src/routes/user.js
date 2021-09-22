const express = require('express');
const workoutLogController = require('../controllers/workout_log');
const jwt = require('express-jwt');

const router = express.Router();
var jwtauth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })


router.route("/activity-logs")
    .get(jwtauth, workoutLogController.getWorkoutLogs)
    .post(jwtauth, workoutLogController.createWorkoutLog);
    
module.exports = router;
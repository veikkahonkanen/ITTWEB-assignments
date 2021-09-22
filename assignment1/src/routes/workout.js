const express = require('express');
const workoutController = require('../controllers/workout');
const ensureLogin= require("connect-ensure-login");

const router = express.Router();

router.use(ensureLogin.ensureLoggedIn("/auth/login"));

router.route("/:workoutId")
    .get(workoutController.showWorkout)
    .post(workoutController.createExercise);
router.route("/")
    .get(workoutController.showWorkouts)
    .post(workoutController.createWorkout);
    
module.exports = router;
const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const workoutRouter = require('./workout');
const userRouter = require('./user')


router.use("/workouts", workoutRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;

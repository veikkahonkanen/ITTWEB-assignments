const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const scoreRouter = require('./score');

router.use('/auth', authRouter);
router.use('/scores', scoreRouter);

module.exports = router;
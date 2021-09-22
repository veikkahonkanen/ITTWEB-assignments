const express = require('express');
const scoreController = require('../controllers/score');
const jwt = require('express-jwt');

const router = express.Router();
var jwtauth = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.route('/')
    .get(scoreController.getScores)
    .post(jwtauth, scoreController.createScore);
    
module.exports = router;
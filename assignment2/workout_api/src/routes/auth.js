const express = require('express');
const auth = require("../controllers/auth");

var router = express.Router();

router.route("/login")
  .post(auth.login);

router.route("/register")
  .post(auth.registerUser);


module.exports = router;

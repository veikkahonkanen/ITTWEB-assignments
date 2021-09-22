const express = require('express');
const auth = require("../controllers/auth");
const ensureLogin= require("connect-ensure-login");

var router = express.Router();

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.use(ensureLogin.ensureLoggedOut("/workouts"));
router.route("/login")
  .get(auth.showLogin)
  .post(auth.loginUser);

router.route("/register")
  .get(auth.showRegister)
  .post(auth.registerUser);


module.exports = router;

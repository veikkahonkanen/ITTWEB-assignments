var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.logout();
  res.render('index', { title: 'FITPUG - Welcome', route: "" });
});

module.exports = router;

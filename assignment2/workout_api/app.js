require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const favicon = require('serve-favicon')
const cors = require('cors')
const compression=require("compression");

require("./src/models/db");

const apiRouter = require("./src/routes/api")
const app = express();

app.use(cors())

app.use(favicon(path.join(__dirname, 'src/public/images', 'favicon.ico')))
// view engine setup

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));*/

app.use(express.static(path.join(__dirname, 'src/public')));

app.use("/api", apiRouter);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

app.use(function(err, req,res,next){
  console.error(err);
  next(err);
});

// Catch unauthorised errors
app.use(function(err, req, res, next) {
  if(err.name=== 'UnauthorizedError') {
    res.status(401);
    res.json({"message":err.name+ ": "+ err.message});
  }
  else{
    next(err);
  }
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).json({ "message": err.message })
});

module.exports = app;

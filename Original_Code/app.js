require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require ('passport');


//require('./app_api/models/db.js');

require('./app_api/models/db');
require('./app_api/config/passport');

const hbs = require('hbs');

const app = express();


// allow CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});



const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const roomsRouter = require('./app_server/routes/rooms');
const travelRouter = require('./app_server/routes/travel');
const usersRouter = require('./app_server/routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/', indexRouter);

app.use('/travel', travelRouter);
app.use('/users', usersRouter);
app.use('/api',apiRouter);




app.get('/', indexRouter);

app.get('/login', (req, res) => res.render('login', {loginSelected: reqPath == '/login'}));
app.get('/travel', (req, res) => res.render('travel', {travelSelected: reqPath == '/travel'}));


//catch 401 and forward to error handler 
app.use((err, req, res , next) => {
  if (err.name === 'UnauthorizedError') {
    res
    .status(401)
    .json({"message": err.name + ": " + err.message});
  }
  });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





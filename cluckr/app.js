var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var clucks = require('./routes/clucks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/clucks', clucks);

app.use((req, res, next) => {
  const username = req.cookies.username;
  // To read cookies, use the property `cookies` of
  // the request object. Cookies are read from the request
  // instead of the response, because the browser
  // sends its cookies the request's headers.
  console.log(req.cookies);
  console.log(req.cookies.username);
  console.log("test username assignment");

  res.locals.username = null;
  if (username) {
    // All properties of the 'locals' property of the response
    // object are available as variables in all forms. Use it
    // to set global variables.
    res.locals.username = username;
  }
  next();
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

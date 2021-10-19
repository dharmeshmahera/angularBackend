var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signUpRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var profilePhotoRouter = require('./routes/profilephoto');
var updateRouter = require('./routes/update');
var connection = require('./connection');
var middleware = require('./middleware');
var displayDataRouter = require('./routes/dispalyData');
var companyRouter = require('./routes/company');
var iconRouter = require('./routes/icon');
var pagesRouter = require('./routes/pages');
var faqRouter = require('./routes/faq');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/data', displayDataRouter);
app.use('/upload', profilePhotoRouter);
app.use('/update', updateRouter);
app.use('/company', companyRouter);
app.use('/icon', iconRouter);
app.use('/pages', pagesRouter);
app.use('/faq', faqRouter);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  next();
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, function () {
  console.log("Express server listening on port 3000");
});

module.exports = app;

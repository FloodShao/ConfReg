"use struct";
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var setting = require('./setting');
var flash = require("connect-flash");

//定义Router
var setting = require('./setting');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var regRouter = require('./routes/reg');
var logoutRouter = require('./routes/logout');

var app = express();

//提供session支持， session支持必须在所有的app.use()之前
var sessionStore = new MySQLStore(setting.mysql_session_options);
app.use(session({
  key : 'session_cookie_name',
  secret : setting.cookieSecret,
  store : sessionStore,
  resave : false,
  saveUninitialized : false
}));

require('express-dynamic-helpers-patch')(app); //使用动态视图管理
app.use(flash());

//视图交互
app.dynamicHelpers({
  user: function(req, res){
    return req.session.user;
  },
  error: function(req, res){
    var err = req.flash("error");
    if(err.length){
      return err;
    }
  },
  success: function(req, res){
    var succ = req.flash("success");
    if(succ.length){
      return succ;
    }
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/reg', regRouter);
app.use('/logout', logoutRouter);

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

// app listening port
app.listen(3001);
module.exports = app;


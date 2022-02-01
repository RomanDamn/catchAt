const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const allUsersRouter = require('./routes/getAllUsers')
const addToFavoritesRouter = require('./routes/Favorites')
const corsMiddleware = require('./middleware/cors.middleware')
const app = express();

app.use(corsMiddleware)
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(passport.initialize())
require("./middleware/passport")(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', allUsersRouter );
app.use('/api/favorites', addToFavoritesRouter );

// catch 404 and forward to error handler
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

module.exports = app;
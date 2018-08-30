var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var estudianteRouter = require('./routes/estudianteRouter');
var directivoRouter = require('./routes/directivoRouter');
var mongoose = require('mongoose');
var config = require('./config');
var db = mongoose.connect(config.mongoUrl);
var passport = require('passport');
var authenticate = require('./authenticate');
var cors = require('cors');
mongoose.connection.on('error', () => { console.log("Base de datos en problemas") })
mongoose.connection.once('open', () => { console.log("Se ha conectado correctamente") })

var app = express();
app.use(cors());
app.all('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] != "https") {
        res.redirect('307', 'https://' + req.hostname + req.url);
    } else {
        next();
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
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/asdfs', estudianteRouter);
app.use('/directivo', directivoRouter);


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
    // res.render('error');
    res.json(err);
});

module.exports = app;
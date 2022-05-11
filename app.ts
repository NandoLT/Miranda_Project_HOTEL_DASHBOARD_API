import {Express, ErrorRequestHandler} from 'express';
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users.route');
var roomsRouter = require('./routes/rooms.route');
var bookingsRouter = require('./routes/bookings.route');

const app:Express = express(); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000)
app.use(cookieParser());

app.use('/', (req, res, next) => {
  res.json({ 
    API: 'Mirandas Dashboard API',
    ROUTES: {
      users: '/api/users',
      rooms: '/api/rooms',
      bookings: '/api/bookings'
    }
  })
});
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};

app.use(errorHandler);

app.listen(app.get('port'), () =>{
  console.log('Server on port ', app.get('port'))
}) 

module.exports = app;

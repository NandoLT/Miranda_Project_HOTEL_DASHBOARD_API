require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var usersRouter = require('./routes/users.route');
var roomsRouter = require('./routes/rooms.route');
var bookingsRouter = require('./routes/bookings.route');
var contactsRouter = require('./routes/contacts.route');


const mongoConnect = require('./libs/DBConnections/mongodB__MDashboard');
mongoConnect.connect;


const app = express(); 

// app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({error: err.message});
});

app.listen(app.get('port'), () =>{
  console.log('Server on port ', process.env.PORT)
}) 

module.exports = app;

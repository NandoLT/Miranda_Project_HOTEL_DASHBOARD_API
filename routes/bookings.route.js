const express = require('express');
let router = express.Router();
const { VerifyToken } = require('../libs/jwtAuth');

const {
    newBooking,
    getAllBookings,
    getBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookings.controller');

//ALL ROUTES ARE SECURE ROUTES
/**
 *  POST create new booking
 *  GET  fetch all bookings
 */
router.route('/')
    .post(VerifyToken, newBooking)
    .get(VerifyToken, getAllBookings)

/**
 *  GET fetch a specific booking
 *  PUT update a specific booking
 *  DELETE delete a specific booking
 */
router.route('/:bookingid')
    .get( VerifyToken, getBooking)
    .put( VerifyToken, updateBooking)
    .delete( VerifyToken, deleteBooking)


module.exports = router;

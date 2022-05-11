const express = require('express');
let router = express.Router();
const { Verify } = require('../libs/jwtAuth');

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
    .post(Verify, newBooking)
    .get(Verify, getAllBookings)

/**
 *  GET fetch a specific booking
 *  PUT update a specific booking
 *  DELETE delete a specific booking
 */
router.route('/:bookingid')
    .get( Verify, getBooking)
    .put( Verify, updateBooking)
    .delete( Verify, deleteBooking)


module.exports = router;

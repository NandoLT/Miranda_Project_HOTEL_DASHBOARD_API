const express = require('express');
let router = express.Router();
const { Verify } = require('../libs/jwtAuth');

const {
    newRoom,
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom,
} = require('../controllers/rooms.controller');


//ALL ROUTES ARE SECURE ROUTES
/**
 *  POST create new room
 *  GET fetch all rooms 
 */
router.route('/')
    .post(Verify, newRoom)
    .get(Verify, getRooms)

/**
 *  GET fetch a specific room
 *  PUT update a specific room
 *  DELETE delete a specific room
 */
router.route('/roomid')
    .get(Verify, getRoom)
    .put(Verify, updateRoom)
    .delete(Verify, deleteRoom)

module.exports = router;

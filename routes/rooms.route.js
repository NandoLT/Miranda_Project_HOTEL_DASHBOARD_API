const express = require('express');
let router = express.Router();
const { VerifyToken } = require('../libs/jwtAuth');

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
    .post(VerifyToken, newRoom)
    .get(VerifyToken, getRooms)

/**
 *  GET fetch a specific room
 *  PUT update a specific room
 *  DELETE delete a specific room
 */
router.route('/:roomid')
    .get(VerifyToken, getRoom)
    .put(VerifyToken, updateRoom)
    .delete(VerifyToken, deleteRoom)

module.exports = router;

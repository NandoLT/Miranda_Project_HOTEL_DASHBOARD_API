export{};
const express = require('express');
let router = express.Router();
const { VerifyToken } = require('../libs/jwtAuth');

const {
    newMessage,
    getMessages,
    getMessage,
    updateMessageStatus,
    deleteMessage,
} = require('../controllers/contacts.controller');


//ALL ROUTES ARE SECURE ROUTES
/**
 *  POST create new room
 *  GET fetch all rooms 
 */
router.route('/')
    .post(VerifyToken, newMessage)
    .get(VerifyToken, getMessages)

/**
 *  GET fetch a specific room
 *  PUT update a specific room
 *  DELETE delete a specific room
 */
router.route('/:messageid')
    .get(VerifyToken, getMessage)
    .put(VerifyToken, updateMessageStatus)
    .delete(VerifyToken, deleteMessage)

module.exports = router;

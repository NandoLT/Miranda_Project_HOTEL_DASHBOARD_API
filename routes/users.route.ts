const express = require('express');
let router = express.Router();
const { Verify } = require('../libs/jwtAuth');

const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');

/**
 *  POST login user
 */
router.post('/login', loginUser);

// Safe Routes
/**
 * GET Resgister New User
 */
router.post('/register', Verify, registerUser);
/**
 * PUT Update info to specific user
 */
router.put('/update', Verify, updateUser);
/**
 * DELETE specific user from DB
 */
router.delete('/delete', Verify, deleteUser);

module.exports = router;

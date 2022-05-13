const express = require('express');
let router = express.Router();
const { VerifyToken } = require('../libs/jwtAuth');
const verifyRole = require('../libs/checkRole');

const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser
} = require('../controllers/users.controller');

/**
 *  POST login user
 */
router.post('/login', loginUser);

// Safe Routes
/**
 * GET Resgister New User
 */
router.post('/register', VerifyToken, verifyRole, registerUser);
/**
 * PUT Update info to specific user
 */
router.put('/update', VerifyToken, updateUser);
/**
 * DELETE specific user from DB
 */
router.delete('/delete', VerifyToken, deleteUser);
/**
 * GET fetch all users
 */
router.get('/', VerifyToken, getUsers);
/**
 * get fetch specific user
 */
router.get('/:id', VerifyToken, getUser);

module.exports = router;

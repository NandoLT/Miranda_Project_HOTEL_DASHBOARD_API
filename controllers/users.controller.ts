export {};
import {Response, Request, NextFunction} from 'express';
const bcrypt = require('bcrypt');
const { Sign } = require('../libs/jwtAuth');
const comparePassword = require('../libs/comparePassword');
const Users = require('../models/users.model');

class UserController  {

    registerUser =  async (req:Request, res:Response, next:NextFunction) => {
        try {
            let userData = req.body;
            userData.password = await bcrypt.hash(userData.password, 7);

            const newUser = new Users(userData);
            const result = await newUser.save();

            res.status(201).json({ result });
            
        } catch (error) {
            next(error);
        }
    }

    loginUser =  async (req:Request, res:Response, next:NextFunction) => {
        const { email, password } = req.body;

        try {

            const user = await Users.findOne({ email: email });

            if(!!user && (await comparePassword(password, user.password))) {
                const userNoPassword = {
                    id: user.id,
                    photo: user.photo,
                    name_surname: user.name_surname,
                    email: user.email,
                    start_date: user.start_date,
                    description: user.description,
                    contact: user.contact,
                    status: user.status,
                    role: user.role
                }
                Sign(userNoPassword, '2h', (error, jwtToken) => {
                    if (error) {
                        next(error.message)
                    }
                    res.status(200).json({
                        msg: 'Token Created',
                        token: jwtToken,       
                    })
                });
            } else {
                const error = new Error('Invalid Credentials');
                next(error);
            }
            
        } catch (error) {
            next(error);
        }
    }

    updateUser =  async (req:Request, res:Response, next:NextFunction) => {
        const dataUpdate = req.body;
        const { authUserId } = req.params;
        const filter = {_id: dataUpdate.userId}

        try {
            if(dataUpdate.userId === authUserId) {
                const updateUser = await Users.findOneAndUpdate(filter, dataUpdate, {
                    new: true
                });
    
                res.status(200).json({ result: updateUser });
            } else {
                const error = new Error('User without permission to perform operation ');
                next(error);
            }
        } catch (error) {
            next(error);
        }
    }
    
    deleteUser =  async (req:Request, res:Response, next:NextFunction) => {
        const {userId: userToDelete } = req.body;
        const { authUserId } = req.params;

        try {
            if(userToDelete === authUserId) {
                await Users.deleteOne({_id: userToDelete} );
                res.status(200).json({ result: `User ${userToDelete} deleted successfully` });
            } else {
                const error = new Error('User without permission to perform operation ');
                next(error);
            }
        } catch (error) {
            next(error);
        }
    }

    getUsers = async (req:Request, res:Response, next:NextFunction) => {
        try {
            
            const result = await Users.find({},{password: 0});
            res.status(200).json({ result });

        } catch (error) {
            next(error);
        }
    }
    
    getUser = async (req:Request, res:Response, next:NextFunction) => {
        const { id } = req.params;
        
        try {
            const result = await Users.findOne({ _id: id }, {password: 0});
            res.status(200).json({ result });

        } catch (error) {
            next(error);
        }
    }

}


module.exports = new UserController;
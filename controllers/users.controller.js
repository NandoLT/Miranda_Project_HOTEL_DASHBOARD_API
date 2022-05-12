const bcrypt = require('bcrypt');
const { Sign } = require('../libs/jwtAuth');
const comparePassword = require('../libs/comparePassword');
const dbQuery = require('../libs/dbQuery');

class UserController  {

    registerUser =  async (req, res, next) => {
        try {
            console.log('REGISTER');
            let {photo, name_surname, email, start_date, description, contact, status, password} = req.body;
            password = await bcrypt.hash(password, 7);

            const response = await dbQuery(
                `INSERT INTO
                users (photo, name_surname, email, start_date, description, contact, status, password)
                VALUES ("${photo}", "${name_surname}", "${email}", "${start_date}", "${description}", "${contact}", "${status}", "${password}")`
            );

            if(response.affectedRows != 1) {
                const error = new Error('Query Insert Error');
                res.status(401).json({ message: error.message });
                return;
            } 

            res.status(201).json({
                result: `Rows created ${response.affectedRows}, with id ${response.insertId}`
            });
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    loginUser =  async (req, res, next) => {
        const { email, password } = req.body;
        try {

            const user = await dbQuery(`SELECT email, password, employeeid FROM users WHERE email = "${email}"`);
            console.log(user)
            if(user?.length != 0 && (await comparePassword(password, user[0].password))) {

                Sign(user[0].employeeid, '2h', (err, jwtToken) => {
                    if (err) {
                        res.status(500).json({ message: err.message });
                    }
                    res.status(200).json({
                        msg: 'Token Created',
                        token: jwtToken,       
                    })
                });
            } else {
                const error = new Error('Invalid Credentials');
                res.status(401).json({ message: error.message });
                return;
            }
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    updateUser =  async (req, res, next) => {
        let columnsValues = ''
        
        for (const item in req.body) {
            if(item != 'userid') {
                columnsValues += `${item}="${req.body[item]}",`;
            } 
        };
        let {userid} = req.body;
        
        try {
            const query = `UPDATE users SET ${columnsValues} employeeid=${userid} WHERE employeeid=${userid}`;
            const result = await dbQuery(query);
            res.status(200).json({
                result: result.message
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    deleteUser =  async (req, res, next) => {
        const {userid} = req.body
        try {
            const result = await dbQuery(`DELETE FROM users WHERE employeeid = ${userid}`);
            
            res.status(200).json({ 
                result: 'affectedRows ' + result.affectedRows
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}


module.exports = new UserController;
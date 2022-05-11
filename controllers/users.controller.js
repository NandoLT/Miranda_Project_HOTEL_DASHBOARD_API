const { Sign } = require('../libs/jwtAuth')
const bcrypt = require('bcrypt');
const dbConnection = require('../libs/DBConnections/mySQL_MDashboard');

class UserController  {

    registerUser =  async (req, res, next) => {
        try {
            let {photo, name_surname, email, start_date, description, contact, status, password} = req.body;
            password = await bcrypt.hash(password, 7);

            await dbConnection.query(
                `INSERT INTO
                    users (photo, name_surname, email, start_date, description, contact, status, password)
                    VALUES ("${photo}", "${name_surname}", "${email}", "${start_date}", "${description}", "${contact}", "${status}", "${password}")`, 
                (error, result, fields ) => {
                    if(error) throw error;

                    res.json({
                        result: result
                    });
                }
            );
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    loginUser =  async (req, res, next) => {
        const { email, password } = req.body;

        try {
            if(email==='veronica@miranda.com' && password === 'contraseña') {
                console.log('NO ERROR')
                Sign(35, '2h', (err, jwtToken) => {
                    if (err) {
                        res.status(500).json({ message: err.message });
                    }
                    res.json({
                        msg: 'Token Created',
                        token: jwtToken,       
                    })
                });
            } else {
                console.log('ERROR')
                const error = new Error('Invalid Credentials');
                res.status(401).json({ message: error.message });
                return;
            }
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    updateUser =  async (req, res, next) => {
        try {
            console.log('UPDATE USER')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    deleteUser =  async (req, res, next) => {
        try {
            console.log('DELETE USER')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

}


module.exports = new UserController;
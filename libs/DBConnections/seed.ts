
require('dotenv').config({
    path: __dirname + '/../../.env'
});

const { faker } = require('@faker-js/faker');
const dbConnect = require('./mySQL_MDashboard.ts');

// module.exports = {
//     addRooms: async() => {

//         await dbConnect.query('INSERT INTO rooms (room_number, bed_type, facilities, rate, status) VALUES (25, SINGLE BED, "Aire acondionado, caja fuerte, minibar", 250.00, AVAILABLE)')
//     }
// }


const addRooms = async () => {

    await dbConnect.query('INSERT INTO rooms (room_number, bed_type, facilities, rate, status) VALUES (25, "SINGLE BED", "Aire acondionado, caja fuerte, minibar", 250.00, "AVAILABLE")')
    dbConnect.end((err) => {
        if (err) {
            console.error('error during disconnection', err.stack)
        }
        console.log('db has disconnected')
    });
}

addRooms();
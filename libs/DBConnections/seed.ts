export{}

require('dotenv').config({
    path: __dirname + '/../../.env'
});

const mongoose = require('mongoose');
const Users = require('../../models/users.model.ts');
const Rooms = require('../../models/rooms.model');
const Bookings = require('../../models/bookings.model');


const fs = require('fs');

async function init({usersData, roomsData, bookingsData}) {
    const responseUsers = await initData(usersData);
    const responseRooms = await initData(roomsData);
    const responseBookings = await initData(bookingsData);
    dropChargeBd(responseUsers, responseRooms, responseBookings);
}

async function initData(dataToParse){
    const data = fs.readFileSync(dataToParse, 'utf8');
    const dataParse = JSON.parse(data);
    return dataParse;
}

async function encryptUSerPasswords(dataUsers){
    let users = []
    Promise.all(dataUsers.map(async user => {
        const userObj = {
            ...user,
            password: await Users.hashPassword(user.password)
        }
        users.push(userObj)
        console.log(users)
    }))
    return users
}

async function  dropChargeBd(dataUsers, dataRooms, dataBookings){
    
    const usersEncrypt = await encryptUSerPasswords(dataUsers)

    setTimeout(async () => {
        try {
            //Users
            await Users.deleteMany({})
            console.log('Collection Users deleted')
            await Users.insertMany(usersEncrypt)
            console.log(`Data Users inserted: ${dataUsers.length}`)

            //Rooms
            await Rooms.deleteMany({})
            console.log('Collection Products deleted')
            await Rooms.insertMany(dataRooms)
            console.log(`Data Products inserted: ${dataRooms.length}`)
            
            //Bookings
            await Bookings.deleteMany({})
            console.log('Collection Products deleted')
            await Rooms.insertMany(dataBookings)
            console.log(`Data Products inserted: ${dataBookings.length}`)

            
            console.log("Closing DB Conecction...")
            mongoose.connection.close()
        } catch (err) {
            console.log(err)
        }
    }, 1000)
        

}

init({usersData:(__dirname + '/users.json'),roomsData:(__dirname + '/rooms.json'),bookingsData:(__dirname + '/bookings.json')});
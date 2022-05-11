require('dotenv').config({
    path: __dirname + '/../../.env'
});

const { faker } = require('@faker-js/faker');
const dbConnect = require('./mySQL_MDashboard.ts');

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const bedType = (type) => {
    const bed = {
        0: 'SINGLE BED',
        1: 'DOUBLE BED',
        2: 'DOUBLE SUPERIOR',
        3: 'SUITE'
    }
    return bed[type];
}

const getFacilities = (type) => {
    const facilities = {
        0: 'Air conditioning',
        1: 'Minibar',
        2: 'Safety Box',
        3: 'Breakfast Included',
        4: 'Whirpool',
        5: 'Wifi',
        6: 'Free Parking'
    }
    return facilities[type];
}

const getOffer = (offer) => {
    offer === 1 ? offer = Math.floor(Math.random() * 50) : offer = 0;
    return offer;
}

const getStatusRoom = (status) => {
    const type = {
        0: 'AVAILABLE',
        1: 'BOOKED',

    }

    return type[status];
}

const getStatusBooking = (status) => {
    const type = {
        0: 'CHEcK_IN',
        1: 'CHECK_OUT',
        2: 'IN_PROGRESS'
    }
    return type[status];
}


const getStatusEmployee = (status) => {
    const type = {
        0:'ACTIVE',
        1:'INACTIVE'
    }
    return type[status];
}

const dateFormat = (date) => {
    const dateParse =  date.toLocaleDateString("fr-CA", { 
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
    return dateParse;
}


const closeConnection = () => {
    dbConnect.end((err) => {
        if (err) {
            console.error('error during disconnection', err.stack)
        }
        console.log('db has disconnected')
    });
}

const addRooms = async () => {

    for(let i = 0; i <= 50; i++) {

        const room_number = Math.floor(Math.random() * 50);
        const bed_type = bedType(getRandomInt(4));
        const facilities = getFacilities(getRandomInt(7));
        const rate = Number(faker.commerce.price(100, 500));
        const photo = 'https://garrettmuseumofart.org/wp-content/uploads/2016/03/placeholder_template.jpg';
        const offer_price = getOffer(getRandomInt(2));
        const status = getStatusRoom(getRandomInt(2));
    
        await dbConnect.query(
            `INSERT INTO 
                rooms (photo,room_number, bed_type, facilities, rate, offer_price, status) 
                VALUES ("${photo}", ${room_number}, "${bed_type}", "${facilities}", ${rate}, ${offer_price}, "${status}")`
        );
    }
}

const addBookings = async () => {

    for(let i = 0; i < 20; i++) {

        setTimeout(async() => {

            const guest = faker.name.findName();
            const order_date = dateFormat(faker.date.past(3));
            const check_in = dateFormat(faker.date.recent());
            const check_out = dateFormat(faker.date.future());
            const status = getStatusBooking(getRandomInt(3));
        
            var roomData;
            var room_id; 
            var room_type;
            
            await dbConnect.query('SELECT * FROM rooms', (err, rows, fields) => {
                if (err) throw err;
                roomData = rows.length;
                getRoomType();
            });
            
            const getRoomType = async () => {
                room_id = Math.floor(Math.random() * (roomData - 1));
                await dbConnect.query(`SELECT bed_type, room_number FROM rooms WHERE roomid= ${room_id}`, (err, rows, fields) => {
                    if (err) throw err;
                    room_type = rows[0].bed_type + '-' + rows[0].room_number; ;
                });
                setTimeout(() => {
                    doQuery()
                },350);
            }
        
            const doQuery = async () => {
                await dbConnect.query(
                    `INSERT INTO 
                        bookings (guest,order_date, check_in, check_out, room_type, status, room_id) 
                        VALUES ("${guest}", "${order_date}", "${check_in}", "${check_out}", "${room_type}", "${status}", ${room_id})`
                );
            }
        }, 500)
    }
}

const addUsers = async () => {

    for (let i = 0; i <= 20; i++){
        const photo = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU="
        const name_surname = faker.name.findName();
        const email= faker.internet.email();
        const start_date = dateFormat(faker.date.past(3));;
        const description = faker.lorem.sentence();
        const contact = faker.phone.phoneNumber();
        const status = getStatusEmployee(getRandomInt(2));
    
        await dbConnect.query(
            `INSERT INTO
                users (photo, name_surname, email, start_date, description, contact, status)
                VALUES ("${photo}", "${name_surname}", "${email}", "${start_date}", "${description}", "${contact}", "${status}")`
        );
    }
}




addRooms();
setTimeout(()=>addBookings(), 1000);
addUsers()

setTimeout(() => {
    closeConnection();
}, 1500)
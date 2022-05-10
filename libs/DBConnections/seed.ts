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

const getStatus = (status) => {
    const avaliability = {
        0: 'AVAILABLE',
        1: 'BOOKED'
    }

    return avaliability[status];
}

const addRooms = async () => {

    for(let i = 0; i <= 50; i++) {

        const room_number = Math.floor(Math.random() * 50);
        const bed_type = bedType(getRandomInt(4));
        const facilities = getFacilities(getRandomInt(7));
        const rate = Number(faker.commerce.price(100, 500));
        const photo = 'https://garrettmuseumofart.org/wp-content/uploads/2016/03/placeholder_template.jpg';
        const offer_price = getOffer(getRandomInt(2));
        const status = getStatus(getRandomInt(2));
    
        await dbConnect.query(
            // 'INSERT INTO rooms (photo,room_number, bed_type, facilities, rate, status) VALUES ("https://garrettmuseumofart.org/wp-content/uploads/2016/03/placeholder_template.jpg",25, "SINGLE BED", "Aire acondionado, caja fuerte, minibar", 250.00, "AVAILABLE")'
            `INSERT INTO 
                rooms (photo,room_number, bed_type, facilities, rate, offer_price, status) 
                VALUES ("${photo}", ${room_number}, "${bed_type}", "${facilities}", ${rate}, ${offer_price}, "${status}")`
        );
    }

    dbConnect.end((err) => {
        if (err) {
            console.error('error during disconnection', err.stack)
        }
        console.log('db has disconnected')
    });
}

addRooms();
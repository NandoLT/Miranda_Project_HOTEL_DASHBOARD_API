const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST_MIRANDA,
    user: process.env.DB_USER_MIRANDA,
    password: process.env.DB_PASS_MIRANDA,
    database: process.env.DB_DATABASE_MIRANDA,
    port: process.env.DB_PORT_MIRANDA,
    flags: "-FOUND_ROWS",
});


connection.connect((error) => {
    !!error ? console.log(error) : console.log('Database connected successfully!');
});

module.exports = connection;
import { Recoverable } from "repl";

const dbConnection = require('./DBConnections/mySQL_MDashboard');

const dbQuery = (query:string) : Promise<any[]> => {
    return new Promise ((resolve, reject) => {
        dbConnection.query(query, 
            (error, result, fields) => {
                if (error) reject(error);
                resolve(result);
            });
    });
}

module.exports = dbQuery;
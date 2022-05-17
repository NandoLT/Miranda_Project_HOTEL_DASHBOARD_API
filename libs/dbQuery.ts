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

const  checkDbOperation = (result) => {
    let error:Error;
    let checking:boolean = true;

    if(result.affectedRows != 1) {
        error = new Error('Query Insert Error');
        return {error, checking: false};
    } 
    return{checking};
}


const createUpdateQuery = (params:Array<any>, jumpKey:string) : string => {
    let columnsValues:string = ''
        
    for (const item in params) {
        if(item != jumpKey) {
            columnsValues += `${item}="${params[item]}",`;
        } 
    };

    return columnsValues;
}

module.exports = {
    dbQuery, 
    checkDbOperation,
    createUpdateQuery
}
    
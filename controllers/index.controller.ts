import {Response, Request, NextFunction} from 'express';
const dbConnect = require('../libs/DBConnections/mySQL_MDashboard');

class IndexController {


    index = (req:Request, res:Response, next:NextFunction) => {
        console.log('ENTRANDO');
        dbConnect.query('SELECT 1 + 1 AS solution', (err:any, rows:any, fields:any) => {
          if (err) throw err;
        
          console.log('The solution is: ', rows[0].solution)
        });
      
        res.status(200).json({status: 'OK'}); 
      };
}

module.exports = new IndexController;
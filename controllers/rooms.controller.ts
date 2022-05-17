export{};
import { Response, Request, NextFunction } from 'express';
const { dbQuery, checkDbOperation, createUpdateQuery } = require('../libs/dbQuery');


class RoomsController  {

    newRoom =  async (req:Request, res:Response, next:NextFunction) => {
        const { photo, room_number, bed_type, facilities, rate, offer_price, status } = req.body;
        
        try {
            const result = await dbQuery(
                `INSERT INTO
                rooms (photo, room_number, bed_type, facilities, rate, offer_price, status)
                VALUES ("${photo}", ${room_number}, "${bed_type}", "${facilities}", ${rate}, ${offer_price}, "${status}")
                ` 
                );
            const check = checkDbOperation(result);
            check.checking ? 
                res.status(200).json({result: `Rows inserteds ${result.affectedRows}`}) : 
                res.status(204).json({result: check.error});
                
        } catch (error) {
            next(error);
        }
    }
    
    getRooms =  async (req:Request, res:Response, next:NextFunction) => {
        try {
            const result = await dbQuery('SELECT * FROM rooms');
            res.status(200).json({result: result});
        } catch (error) {
            next(error)
        }
    }
    
    getRoom =  async (req:Request, res:Response, next:NextFunction) => {
        const { roomid } = req.params;
        
        try {
            const result = await dbQuery(`SELECT * FROM rooms WHERE roomid=${roomid}`);
            res.status(200).json({ result: result})
        } catch (error) {
            next(error)
        }
    }
    
    updateRoom =  async (req:Request, res:Response, next:NextFunction) => {
        const { roomid } = req.params;
        try {
            const columnsValues = createUpdateQuery(req.body, 'roomid');
            const query = `UPDATE rooms SET ${columnsValues} roomid=${roomid} WHERE roomid=${roomid}`;
            const result = await dbQuery(query);
            res.status(200).json({
                result: result.message
            });
        } catch (error) {
            next(error)
        }
    }
    
    deleteRoom =  async (req:Request, res:Response, next:NextFunction) => {
        const { roomid } = req.params
        try {
            const result = await dbQuery(`DELETE FROM rooms WHERE roomid = ${roomid}`);

            const check = checkDbOperation(result);
            check.checking ? 
                res.status(200).json({result: `Affected Rows ${result.affectedRows}`}) : 
                next(check.error);
    
        } catch (error) {
            next(error);
        }
    }

}


module.exports = new RoomsController;
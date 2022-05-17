export{};
import { Request, Response, NextFunction }  from 'express';
const { dbQuery, checkDbOperation, createUpdateQuery } = require('../libs/dbQuery');

class BookingsController  {

    newBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const { guest, order_date, check_in, check_out, room_type, status, room_id } = req.body;

        try {
            const result = await dbQuery(
                `INSERT INTO
                bookings ( guest, order_date, check_in, check_out, room_type, status, room_id )
                VALUES ("${guest}", "${order_date}", "${check_in}", "${check_out}", "${room_type}", "${status}", ${room_id})
                ` 
                );
            const check = checkDbOperation(result);
            check.checking ? 
                res.status(200).json({result: `Rows inserteds ${result.affectedRows}`}) : 
                next(check.error);

        } catch (error) {
            next(error);
        }
    }

    getAllBookings =  async (req:Request, res:Response, next:NextFunction) => {
        try {
            const result = await dbQuery('SELECT * FROM bookings');
            res.status(200).json({result: result});
        } catch (error) {
            next(error);
        }
    }

    getBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const { bookingid } = req.params;
        
        try {
            const result = await dbQuery(`SELECT * FROM bookings WHERE bookingid=${bookingid}`);
            res.status(200).json({ result: result})
        } catch (error) {
            next(error)
        }
    }

    updateBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const { bookingid } = req.params;
        try {
            const columnsValues = createUpdateQuery(req.body, 'bookingid');
            const query = `UPDATE bookings SET ${columnsValues} bookingid=${bookingid} WHERE bookingid=${bookingid}`;
            const result = await dbQuery(query);
            res.status(200).json({
                result: result.message
            });
        } catch (error) {
            next(error)
        }
    }

    deleteBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const { bookingid } = req.params
        try {
            const result = await dbQuery(`DELETE FROM bookings WHERE bookingid = ${bookingid}`);

            const check = checkDbOperation(result);
            check.checking ? 
                res.status(200).json({result: `Affected Rows ${result.affectedRows}`}) : 
                next(check.error);
    
        } catch (error) {
            next(error);
        }
    }

}


module.exports = new BookingsController;
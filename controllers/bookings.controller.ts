export{};
import { Request, Response, NextFunction }  from 'express';
const Bookings = require('../models/bookings.model');

class BookingsController  {

    newBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const bookingData = req.body;

        try {
            const newBooking = new Bookings(bookingData);
            const result = await newBooking.save();

            res.status(201).json({ result });

        } catch (error) {
            next(error);
        }
    }

    getAllBookings =  async (req:Request, res:Response, next:NextFunction) => {
        try {
            const result = await Bookings.find();
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }

    getBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const { bookingid } = req.params;
        
        try {
            const result =await  Bookings.findOne({ _id: bookingid });
            res.status(200).json({ result });
        } catch (error) {
            next(error)
        }
    }

    updateBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const { bookingid } = req.params;
        const dataToupdate = req.body;
        const filter = {_id: bookingid };
        try {
            const updateBooking = await Bookings.findOneAndUpdate(filter, dataToupdate,  { 
                new: true
            });
            res.status(201).json({ result: updateBooking })
        } catch (error) {
            next(error)
        }
    }

    deleteBooking =  async (req:Request, res:Response, next:NextFunction) => {
        const { bookingid } = req.params
        try {
            await Bookings.deleteOne({ _id: bookingid });
            res.status(200).json({ result: `Booking ${bookingid} deleted successfully` })
    
        } catch (error) {
            next(error);
        }
    }

}


module.exports = new BookingsController;
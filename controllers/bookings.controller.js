const Bookings = require('../models/bookings.model');

class BookingsController  {

    newBooking =  async (req, res, next) => {
        const bookingData = req.body;

        try {
            const newBooking = new Bookings(bookingData);
            const result = await newBooking.save();

            res.status(201).json({ result });

        } catch (error) {
            next(error);
        }
    }

    getAllBookings =  async (req, res, next) => {
        try {
            const result = await Bookings.find();
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }

    getBooking =  async (req, res, next) => {
        const { bookingid } = req.params;
        
        try {
            const result =await  Bookings.findOne({ _id: bookingid });
            res.status(200).json({ result });
        } catch (error) {
            next(error)
        }
    }

    getBookingByReference = async (req, res, next) => {
        const {reference} = req.params;
        
        try {
            const result =await  Bookings.findOne({ reference:reference });
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }

    updateBooking =  async (req, res, next) => {
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

    deleteBooking =  async (req, res, next) => {
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
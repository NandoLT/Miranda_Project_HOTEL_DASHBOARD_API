

class BookingsController  {
    newBooking =  async (req, res, next) => {
        try {
            console.log('NEW BOOKING')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    getAllBookings =  async (req, res, next) => {
        try {
            console.log('GET ALL BOOKINGS')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    getBooking =  async (req, res, next) => {
        try {
            console.log('GET SPECIFIC BOOKING')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    updateBooking =  async (req, res, next) => {
        try {
            console.log('UPDATE SPECIFIC BOOKING')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    deleteBooking =  async (req, res, next) => {
        try {
            console.log('DELETE SPECIFIC BOOKING')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

}


module.exports = new BookingsController;


class RoomsController  {
    newRoom =  async (req, res, next) => {
        try {
            console.log('REGISTER NEW ROOM')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    getRooms =  async (req, res, next) => {
        try {
            console.log('GET ALL ROOMS')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    getRoom =  async (req, res, next) => {
        try {
            console.log('GET SPECIFIC ROOM')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    updateRoom =  async (req, res, next) => {
        try {
            console.log('UPDATE SPECIFIC ROOM')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    deleteRoom =  async (req, res, next) => {
        try {
            console.log('DELETE SPECIFIC ROOM')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

}


module.exports = new RoomsController;
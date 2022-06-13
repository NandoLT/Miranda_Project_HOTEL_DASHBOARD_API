const Rooms = require('../models/rooms.model');

class RoomsController  {

    newRoom =  async (req, res, next) => {
        const  roomData = req.body;
        
        try {
            const newRoom = new Rooms(roomData);
            const result = await newRoom.save();

            res.status(201).json({ result });
                
        } catch (error) {
            next(error);
        }
    }
    
    getRooms =  async (req, res, next) => {
        try {
            const result = await Rooms.find();
            res.status(200).json({ result });
        } catch (error) {
            next(error)
        }
    }
    
    getRoom =  async (req, res, next) => {
        const { roomid } = req.params;
        
        try {
            const result = await Rooms.findOne({_id: roomid });
            res.status(200).json({ result });
        } catch (error) {
            next(error)
        }
    }
    
    updateRoom =  async (req, res, next) => {
        const { roomid } = req.params;
        const dataToUpdate = req.body;
        const filter = {_id: roomid };

        try {
            const updateRoom = await Rooms.findOneAndUpdate(filter, dataToUpdate, {
                new: true
            });
            res.status(201).json({ result: updateRoom });    
        } catch (error) {
            next(error)
        }
    }
    
    deleteRoom =  async (req, res, next) => {
        const { roomid } = req.params
        try {
            await Rooms.deleteOne({_id: roomid });
            res.status(200).json({ result: `Room ${roomid} deleted successfully` });
        } catch (error) {
            next(error);
        }
    }

}


module.exports = new RoomsController;
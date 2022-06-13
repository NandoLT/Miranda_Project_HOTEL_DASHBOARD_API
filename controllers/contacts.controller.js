const Contacts = require('../models/contacts.model');

class ContactsController  {

    newMessage =  async (req, res, next) => {
        const  messageData = req.body;
        
        try {
            const newMessage = new Contacts(messageData);
            const result = await newMessage.save();

            res.status(201).json({ result });
                
        } catch (error) {
            next(error);
        }
    }
    
    getMessages =  async (req, res, next) => {
        try {
            const result = await Contacts.find();
            res.json({ result });
        } catch (error) {
            next(error)
        }
    }
    
    getMessage =  async (req, res, next) => {
        const { messageid } = req.params;
        
        try {
            const result = await Contacts.findOne({_id: messageid });
            res.json({ result });
        } catch (error) {
            next(error)
        }
    }
    
    updateMessageStatus =  async (req, res, next) => {
        const { messageid } = req.params;
        const { status } = req.body;
        console.log('sTATUS update', status)
        const filter = {_id: messageid };

        try {
            const updateRoom = await Contacts.findOneAndUpdate(filter, {readstatus:status}, {
                new: true
            });
            res.status(201).json({ result: updateRoom });    
        } catch (error) {
            next(error)
        }
    }
    
    deleteMessage =  async (req, res, next) => {
        const { messageid } = req.params
        try {
            await Contacts.deleteOne({_id: messageid });
            res.json({ result: `Message ${messageid} deleted successfully` });
        } catch (error) {
            next(error);
        }
    }

}


module.exports = new ContactsController;
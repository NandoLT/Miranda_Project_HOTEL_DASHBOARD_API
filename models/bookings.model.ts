export{}
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingsSchema = new Schema ({ 
    guest:          { type:String, required: true, indexed: true },
    order_date:     { type:Date, required:true },
    check_in:       { type:Date, required:true },
    check_out:      { type:Date, required:true },
    room_type:      { type:String, required:true },
    status:         { type:String, enum:['CHECK IN','CHECK OUT','IN PROGRESS'], default: 'IN PROGRESS', required:true},
    room_id:        { type:Number, indexed:true, required:true}
},{ versionKey: false });


const Bookings = mongoose.model('Bookings', bookingsSchema);

module.exports = Bookings
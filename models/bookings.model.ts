export{}
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingsSchema = new Schema ({ 
    guest:              { type:String, required:true, indexed:true },
    order_date:         { type:Date, required:true },
    check_in:           { type:Date, required:true },
    check_out:          { type:Date, required:true },
    room_type:          { type:String, required:true },
    price:              { type:String, required:true},
    special_request:    { type:String, default:'Empty Notes'},
    status:             { type:String, enum:['CHECK IN','CHECK OUT','IN PROGRESS'], default: 'IN PROGRESS', required:true},
    room_id:            { type:Number, indexed:true, required:true},
    reference:          { type:String, required:true },
    CheckedIn:          { type:Boolean, required:true, default:false}
},{ versionKey: false });


const Bookings = mongoose.model('Bookings', bookingsSchema);

module.exports = Bookings
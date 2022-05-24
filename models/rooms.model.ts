export{}
const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomsSchema = new Schema ({ 
    photo:       { type:String, default: 'https://garrettmuseumofart.org/wp-content/uploads/2016/03/placeholder_template.jpg'},
    room_number: { type:Number, required: true, indexed: true, unique: true },
    bed_type:    { type:String, enum: ['SINGLE BED', 'DOUBLE BED', 'DOUBLE SUPERIOR', 'SUITE'], required:true },
    facilities:  { type:Array, required:true },
    rate:        { type:Number, required:true },
    offer_price: { type:Number, default:0 },
    status:      { type:String, enum:['AVAILABLE','BOOKED'], default: 'AVAILABLE', required:true }
},{ versionKey: false });


const Rooms = mongoose.model('Rooms', roomsSchema);

module.exports = Rooms
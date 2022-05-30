export{};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const conatactsSchema = new Schema({ 
    fullname:   { type: String, required: true, index: true },
    email:          { type: String, required: true, index: true },
    phone:        { type: String, required: true}, 
    subject:    { type: String, required: true }, 
    readstatus:         { type: Boolean, default:false}, 
    message:       { type: String, required:true },
},{ versionKey: false });

const Contacts = mongoose.model('Contacts', conatactsSchema);


module.exports = Contacts;
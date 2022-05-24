export{};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({ 
    photo:          { type: String, default: 'https://180dc.org/wp-content/uploads/2016/08/default-profile.png'},
    name_surname:   { type: String, required: true, index: true, unique: true },
    email:          { type: String, required: true, index: true, unique: true },
    start_date :    { type: Date, required: true },
    description:    { type: String, required: true }, 
    contact:        { type: String, required: true}, 
    status:         { type: String, enum:['ACTIVE', 'INACTIVE'], default: 'ACTIVE', required: true }, 
    password:       { type: String, required:true },
    role:           { type: String, enum:['ADMIN', 'EMPLOYEE'], default:'EMPLOYEE', required: true },
},{ versionKey: false });

const Users = mongoose.model('Users', usersSchema);


module.exports = Users;
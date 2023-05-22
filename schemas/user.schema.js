const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

    fullName: {type: String, required: true, minlength: 6, maxlength: 150},
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength:150,
        unique: true,
        index: true,
        validate: {
            validator: function(value) {
                return /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/  
                
            },
            message: props => `${props.value} no es un mail valido`
        }
    },
    password: {
        type: String, required: true, minlength: 8, maxlength: 150
    },
    role: {
        type: String, 
        required: true, 
        default:"CLIENT_ROLE", 
        enum: [
        'CLIENT_ROLE', 
        'ADMIN_ROLE', 
    ]
    },
    date: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now},





})

module.exports = mongoose.model('User', UserSchema)
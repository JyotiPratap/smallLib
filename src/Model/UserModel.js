const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        unique: true,
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 15
    },
    Role:{
        type:String,
        required:true,
        enum: ["CREATOR", "VIEWER", "VIEW_ALL"],
        trim:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Creator', user) 
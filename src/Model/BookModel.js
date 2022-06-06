const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const book = new mongoose.Schema( {
    title: {
        required: true,
        type: String,
        unique: true,
        trim: true
    },
    ISBN: {
        required: true,
        type: String,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "Creator",
        trim: true
    },
    releasedAt: {
        type: Date,
        // required: true,
        default:Date.now(),
        trim: true
    }
}, { timestamps: true });   
module.exports = mongoose.model('BookModel', book) 
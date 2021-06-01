const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dataSchema = new Schema({
    one:{
        type:Number,
        required:true,
    },
    two:{
        type:Number,
        required:true,
    }, 
    three:{
        type:Number,
        required:true,
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    }
}, {timestamps:true});

module.exports = mongoose.model("Data", dataSchema);
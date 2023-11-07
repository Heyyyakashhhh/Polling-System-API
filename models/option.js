//Question schema here
const mongoose = require('mongoose');
const Question = require('./question')
const optionSchema = mongoose.Schema({
    option:{
        type: String,
        required: true
    },

    question:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    vote:{
        type:Number,
        default:0
    },

    link_to_vote:{
        type: String,

    }
    
});

const Option = mongoose.model('Option' , optionSchema);
module.exports = Option
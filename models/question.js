//Question schema here
const mongoose = require('mongoose');
const Option = require('./option')
const QuestionSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    option:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ]
});

const Question = mongoose.model('Question' , QuestionSchema);
module.exports = Question
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
asssessment:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
    totalScore:{
        type: Number,
        required: true
    },
    percentageScore:{
        type: Number,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    lastUpdateAt:{
        type: Date,
        default: Date.now
    }
});



const Result = mongoose.model('Result', studentSchema);
module.exports = Result;
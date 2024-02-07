const mongoose = require('mongoose');

const studentAnswerSchema = new mongoose.Schema({
student:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    
},
assessment:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Assessment'
    
},
    question: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: String,
        isCorrect: Boolean,
        marks:Number,
    createAt:{
        type: Date,
        default: Date.now
    },
    lastUpdateAt:{
        type: Date,
        default: Date.now
    }
});
const StudentAnswer = mongoose.model('StudentAnswer', studentAnswerSchema);
module.exports = StudentAnswer;
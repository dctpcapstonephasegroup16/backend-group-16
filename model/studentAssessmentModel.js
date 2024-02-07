const mongoose = require('mongoose');

const studentAssessmentSchema = new mongoose.Schema({
student:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    
},
assessment:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Assessment'
    
},
    currentQuestionId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    answers:[{
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
        ref: 'Question'
        },
        isCorrect: Boolean,
        marks:Number,
        
}] ,
    startTime: Date,
    endTime: Date,
    
    createAt:{
        type: Date,
        default: Date.now
    },
    lastUpdateAt:{
        type: Date,
        default: Date.now
    }
});



const StudentAssessment = mongoose.model('StudentAssessment', studentAssessmentSchema);
module.exports = StudentAssessment;
const mongoose = require('mongoose');

const studentAssessmentSchema = new mongoose.Schema({
student:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
},
assessment:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
},
    currentQuestionId: {
        type: Number,
    },
    answers:[{
        type:String
}] ,
    startTime: {
        type:Date(),
    },
    endTime: {
        type:Date(),
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



const StudentAssessment = mongoose.model('Teacher', studentAssessmentSchema);
module.exports = StudentAssessment;
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
teacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
},
    courseTittle: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
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



const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
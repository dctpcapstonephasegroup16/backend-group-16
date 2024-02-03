const express = require('express')
const studentAssessmentMdel = require('../model/studentAssessmentModel')
const assessmentModel = require('../model/assessmentModel')
const studentModel = require('../model/studentModel')
const questionModel = require('../model/questionModel')


const startQuiz = async (req, res) => {
    const assessmentId = req.params.assessmentId
    try {
        // Fetch assessment details
        const assessmentDetails = await assessmentModel.findById(assessmentId)
        if (!assessmentDetails) {
            return res.status(404).json({ message: 'Assessment not found' })
        }
        // Fetch the first question
        const firstQuestion = await questionModel.findOne({ assessmentId }).sort('createdAt').exec()
        // Get logged in student ID
        const student = await studentModel.findOne({ user: req.user.userId })
        if (!student) {
            return res.status(404).json({ message: 'Student not found' })
        }
        const studentId = student._id

        //Create a new studentAssessment document in the DB
        const newStudentAssessment = new studentAssessmentMdel({
            student: studentId,
            currentQuestionId: firstQuestion._id,
            answers: [],
            startTime: new Date(),
        })
        await newStudentAssessment.save()

        // Send the first question to student
        res.json({ question: firstQuestion, userProgress: newStudentAssessment })

    } catch (error) {
        res.status(500).json({ error: 'Oops! There is a technical issue, kindly contact your admin' })
    }
}

const submitStudentChoice = async (req, res) => {
    const assessmentId = req.params.assessmentId
    const { student, userProgress, userOption } = req.body

    try {
        // Fetch the current question and assessment details
        const currentQuestion = await questionModel.findById(userProgress.currentQuestionIndex)
        const assessment = await assessmentModel.findById(assessmentId)
        if (!currentQuestion || !assessment) {
            return res.status(404).json({ message: 'Question or Assessment not found' })
        }
// checj if the user's option is correct
const isCorrect = userOption === currentQuestion.correctAnswer
// update user's progress
userProgress.answers.push({questionId:currentQuestion._id, isCorrect,marks:isCorrect?currentQuestion.marks:0})

//check if there are more questions
const  nextQuestion = await questionModel.findOne({assessmentId, createdAt:{$gt:currentQuestion.createAt}}).sort('createdAt').exec()
if(nextQuestion){
// Update the studentAssessment document in the DB
userProgress.currentQuestionId = nextQuestion._id
await userProgress.save()

// Send the next question to the student
res.json({question:nextQuestion, userProgress})
}else{
    // Student has completed the assessment
    userProgress.endTime = new Date()
    await userProgress.save()
    //Calculate Total marks based on student's answer
    const totalMarks = userProgress.answers.reduce((total,answer) => total+ answer.marks,0)
    const percentageScores = (totalMarks/assessment.maximumScore)*100
    res.json({message:'Assessment completed', userProgress, totalMarks,percentageScores})
}
    } catch (error) {
        res.status(500).json({ error: ' Server errro occured' })
    }
}
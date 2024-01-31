const express = require('express')

const questionModel = require('../model/questionModel')

const userModel = require('../model/userModel')

const assessmentModel = require('../model/assessmentModel')

const createQuestion = async (req, res) => {
    const { assessmentId,text,options,correctAnswer,marks } = req.body
    try {
        const assessment = await assessmentModel.findById(assessmentId)
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' })
        }
        const createdQuestion = await questionModel.create({
            assessment: assessmentId,
            text: text,
            options: options,
            correctAnswer: correctAnswer,
            marks: marks
        })
       
        res.status(201).json({
            question: createdQuestion,
            message: 'Question created successfully'
        })
    } catch (error) {
        res.status(500).json({ error: 'Fialed to create question', error })
    }

}

const getQuestionById = async (req, res) => {
    const { questionId } = req.params
    try {
        const avaliableQuestions = await questionModel.findById(questionId)
        if (!avaliableQuestions) {
            return res.status(404).json({ error: 'Question not found' })
        }
        res.status(200).json(avaliableQuestions)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve questions', error })
    }
}

const getQuestionsByAssessmentId = async (req, res) => {
    const { assessmentId } = req.params
    try {
        const getquestions = await questionModel.find({ assessment: assessmentId })
        if (getquestions.lenght < 1) {
            return res.status(404).json({ error: 'No questions for the selected assessment' })
        }
        res.status(200).json(getquestions)
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve questions', error })
    }
}

const updateQuestion = async (req, res) => {
    const { questionId, text, options, correctAnswer, marks } = req.body
    try {

        const updatedQuestion = await questionModel.findByIdAndUpdate(questionId,
            {
                text: text,
                options: options,
                correctAnswer: correctAnswer,
                marks: marks
            })
        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Question not found' })
        }
        res.status(200).json(updatedQuestion)

    } catch (error) {
        res.status(500).json({ error: 'Failed to update question', error })
    }
}

module.exports = {
    createQuestion,
    getQuestionsByAssessmentId,
    getQuestionById,
    updateQuestion
}
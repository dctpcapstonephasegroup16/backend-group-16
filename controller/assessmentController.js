const express = require('express')

const assessmentModel = require('../model/assessmentModel')

const courseModel = require('../model/courseModel')
const teacherModel = require('../model/teacherModel')

const createAssessment = async (req, res) => {
    const { courseId, assessmentTittle, startTime, endTime, maximumScore, duration } = req.body
    const {userId} = req.user;
    try {
        const teacherRecords = await teacherModel.findOne({ user: userId })
        if (!teacherRecords) {
            return res.status(404).json({ error: 'Teacher not found' })
        }
        const teacherId = teacherRecords._id;
        const createdAssessment = await assessmentModel.create({
            course: courseId,
            teacher: teacherId,
            assessmentTittle: assessmentTittle,
            startTime: startTime,
            endTime: endTime,
            maximumScore: maximumScore,
            duration: duration
        });

        res.status(201).json({
            assessment: createdAssessment,
            message: 'Assessment created successfully'
        })

    } catch (error) {
        res.status(500).json({ error: 'Failed to create an assessment', error })
    }
}

const getAllAssessments = async (req, res) => {
    try {
        const assessmentsRetrieved = await assessmentModel.find()
       .populate({
        path: 'course',
        select: ['courseTittle','courseCode'],
        })
        .populate({
            path: 'teacher',
            select: ['firstName','lastName'],
            })
       // .populate('teacher','firstName','lastname')
        if (!assessmentsRetrieved) {
            return res.status(404).json({ error: 'Assessment not found' })
        }
        res.status(200).json(assessmentsRetrieved)
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve assessment', error })
    }
}

const getAsssessmentByCourseId = async (req, res) => {
    const { courseId } = req.params
    try {
        const assessmentByCourse = await assessmentModel.find({ course: courseId })
        if (!assessmentByCourse) {
            return res.status(404).json({ error: 'Assessment not found for the selected course' })
        }
        res.status(200).json(assessmentByCourse)
    } catch (error) {
        res.status(500).json({ error: 'Could not retireve assessment for the selected course', error })
    }
}

const getAsssessmentByCourseIdandSignInTeacher = async (req, res) => {
    const { courseId } = req.params
    const {userId} = req.user
    try {
const getTeacherId = await teacherModel.findOne({user:userId})
if(!getTeacherId){
    return res.status(404).json({errror: 'Record not found'})
}
const teacherId = getTeacherId._id

        const assessmentByCourseAndSignInUser = await assessmentModel.find({course:courseId, teacher:teacherId})
        if (assessmentByCourseAndSignInUser.length < 1 ){
            return res.status(404).json({ error: 'Assessment not found for the selected course' })
        }
        res.status(200).json(assessmentByCourseAndSignInUser)
    } catch (error) {
        res.status(500).json({ error: 'Could not retireve assessment for the selected course', error })
    }
}

const updateAssessment = async (req, res) => {
    const { assessmentId, courseId, assessmentTittle, startTime, endTime, maximumScore, duration } = req.body
    try {
        const updatedAssessment = await assessmentModel.findByIdAndUpdate(assessmentId,
            {
                course: courseId,
                assessmentTittle: assessmentTittle,
                startTime: startTime,
                endTime: endTime,
                maximumScore: maximumScore,
                duration: duration
            },
            {
                new: true
            })

        if (!updatedAssessment) {
            res.status(404).json({ error: 'Assessment not found' })
        }
        res.status(200).json(updatedAssessment)
    } catch (error) {
        res.status(500).json({ error: 'Could not modify assessment', error })
    }
}

const getAssessmentById = async (req, res) => {
    const { assessmentId } = req.params

    try {
        const retirevedAssessment = await assessmentModel.findById(assessmentId)
        if (!retirevedAssessment) {
            return res.status(404).json({ error: 'Assessment not found' })
        }
        res.status(200).json(retirevedAssessment)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retireve assessment', error })
    }
}

module.exports = {
    createAssessment,
    getAllAssessments,
    getAsssessmentByCourseId,
    updateAssessment,
    getAssessmentById,
    getAsssessmentByCourseIdandSignInTeacher
}
const express = require('express')

const courseModel = require('../model/courseModel')

const createCourse = async (req, res) => {
    const { courseTittle, courseCode, courseStatus } = req.body

    try {

        const courseCreated = await courseModel.create({
            courseTittle,
            courseCode,
            courseStatus,
        })
        res.status(201).json({
            course: courseCreated,
            message: 'Course created successfully'
        })
    } catch (error) {
        res.statu(500).json({ error: 'Failed to create the course', error })
    }
}

const getAllCourse = async (req, res) => {
    try {
        const courses = await courseModel.find({});
        if (!courses) {
            return res.status(404).json({ error: 'No avaliable courses' })
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve courses', error })
    }
}

const getCourseById = async (req, res) => {
    const { courseId } = req.params
    try {
        const course = await courseModel.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: 'Course not found' })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retireve course', error })
    }
}

const updateCourse = async (req , res) => {
    const { courseTittle, courseCode, courseStatus, courseId } = req.body

    try{
        const updatedCourse = await courseModel.findByIdAndUpdate(courseId, {
            courseTittle:courseTittle,
            courseCode:courseCode,
        },
         {
            new : true
         })

         if(!updatedCourse){
            return res.status(404).json({error:'Course not found'})
         }
         res.status(200).json(updatedCourse)
    }catch(error){
        res.status(500).json({error: 'Failed to update course'})
    }
}

module.exports = {
    createCourse,
    getAllCourse,
    getCourseById,
    updateCourse
}
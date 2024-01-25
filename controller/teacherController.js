const express = require('express');
const userModel = require('../model/userModel');
const teacherModel = require('../model/teacherModel');

const getAllTeachers = async (req, res) => {

    try {
        const teachers = await teacherModel.find({});
        res.status(200).json(teachers)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teachers' })
    }
}

const getTeacherById = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacher = await teacherModel.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teacher' })
    }
}

const getTeacherByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const teacherRecords = await teacherModel.find({ user: userId }).populate(user)
        res.status(200).json(teacherRecords);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teacher' })
    }
}


module.exports = {
    getAllTeachers,
    getTeacherById,
    getTeacherByUserId
}
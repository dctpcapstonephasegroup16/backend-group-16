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
    const userId = req.userId;
    try {
        // return teachers record based on the userId including users details without password
        const teacherRecords = await teacherModel.find({ user: userId }).populate(
            {
                path: 'user',
                select: '-password'

            }).exec();
        res.status(200).json(teacherRecords);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teacher' })
    }
}

const updateTeacherDetails = async (req, res) => {
    const { firstName, middleName, lastName, dateOfBirth, gender, teacherId } = req.body;
    try {
        const updatedTeacher = await teacherModel.findByIdAndUpdate(teacherId, {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
        },
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' })
        }
        res.status(200).json(updatedTeacher);

    } catch (error) {
        res.status(500).json({ error: 'Failed to modify teacher', error })
    }
}



module.exports = {
    getAllTeachers,
    getTeacherById,
    getTeacherByUserId,
    updateTeacherDetails
}
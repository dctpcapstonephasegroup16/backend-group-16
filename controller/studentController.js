const express = require('express');

const userModel = require('../model/userModel');
const teacherModel = require('../model/teacherModel');
const studentModel = require('../model/studentModel')

const getAllStudents = async (req, res) => {

    try {
        const students = await studentModel.find({});
        if(students.length < 1){
            return res.status(404).json({error : 'No avaliable students'})
        }
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve students' })
    }
}

const getStudentsById = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve student' })
    }
}

const getStudentByUserId = async (req, res) => {
    
    const userId = req.user.userId;
    
    try {
        // return teachers record based on the userId including users details without password
        const studentRecords = await studentModel.findOne({ user: userId }).populate({
            path: 'course',
            select: ['courseTittle','courseCode']
        })
        res.status(200).json(studentRecords);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server issues. to retrieve student' ,error})
    }
}

const updateStudentDetails = async (req, res) => {
    const { firstName, middleName, lastName, dateOfBirth, gender, studentId } = req.body;
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(studentId, {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
        },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' })
        }
        res.status(200).json(updatedStudent);

    } catch (error) {
        res.status(500).json({ error: 'Failed to modify teacher', error })
    }
}



module.exports = {
    getAllStudents,
    getStudentsById,
    getStudentByUserId,
    updateStudentDetails
}
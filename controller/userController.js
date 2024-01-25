const express = require('express');

const userModel = require('../model/userModel');
const teacherModel = require('../model/teacherModel');
const studentModel = require('../model/studentModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {

    const { email, password, role, userStatus,firstName, middleName, lastName, dateOfBirth,gender } = req.body;
    try {
        
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' })
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       const newUser = await userModel.create({
            email,
            password: hashedPassword,
            role: role,
            userStatus,
        });
        if(role == "student"){
            
            const newStudent = await studentModel.create({user:newUser._id,firstName,middleName,lastName,gender,dateOfBirth});
            
            res.status(201).json({
                user: newUser,
                student: newStudent,
                message: 'User and Student created successfully',
            });   
        }
        if(role == "teacher"){
            const newTeacher = await teacherModel.create({ user:newUser._id,firstName,middleName,lastName,gender,dateOfBirth});
            res.status(201).json({
                user: newUser,
                Teacher: newTeacher,
                message: 'User and Teacher created successfully',
            });
        }
       
} catch (error) {
        res.status(500).json({ error: 'Internal Server Error',error })
    }

}

const getAllUsers = async (req, res) => {

    try {
        const users = await userModel.find({});
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieved users', error })
    }
}

const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const userDetails = await userModel.findById(userId);
        if(!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieved user', error })
    }
}

const modifyUserAccount = async (req, res) => {
    const { userId } = req.params;
    const {userStatus} = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, {userStatus:userStatus}, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', error })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    modifyUserAccount
}
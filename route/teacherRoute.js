const express = require('express');
const teacherController = require('../controller/teacherController');

const router = express.Router();

router.get('/', teacherController.getAllTeachers);
// router.post('/', userController.createUser);
router.get('/:teacherId', teacherController.getTeacherById);
router.get('/user/:userId', teacherController.getTeacherByUserId);
router.put('/', teacherController.updateTeacherDetails);

module.exports = router;
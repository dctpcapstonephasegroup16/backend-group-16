const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');
const {authenticateUser,authorizeRole} = require('../middleware/authMiddleware')


router.get('/', teacherController.getAllTeachers);
// router.post('/', userController.createUser);
router.get('/records', authenticateUser, authorizeRole(['teacher']),teacherController.getTeacherByUserId);
router.get('/:teacherId', teacherController.getTeacherById);

router.put('/', teacherController.updateTeacherDetails);

module.exports = router;
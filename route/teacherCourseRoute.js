const express = require('express');
const router = express.Router();
const teacherCourseController = require('../controller/teacherCourseController');
const {authenticateUser,authorizeRole} = require('../middleware/authMiddleware')

router.post('/', teacherCourseController.asignCourseToTeachers)
router.get('/', teacherCourseController.getAllAsignedCourses);
// router.post('/', userController.createUser);
router.get('/teacher/', authenticateUser, authorizeRole(['teacher']),teacherCourseController.getYourAsignedCources);
router.get('/:teacherCourseId', teacherCourseController.getasignedCourseById);

router.put('/', teacherCourseController.updateAsignedCourse);
router.delete('/:teacherCourseId', teacherCourseController.deleteAsignedCourse);
module.exports = router;
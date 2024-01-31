const express = require('express');
const assesmentController = require('../controller/assessmentController');
const {authenticateUser,authorizeRole} = require('../middleware/authMiddleware')
const router = express.Router();

router.get('/', authenticateUser,authorizeRole(["teacher"]),assesmentController.getAllAssessments);
router.post('/', authenticateUser,authorizeRole(["teacher"]), assesmentController.createAssessment);
//router.get('/:userId', userController.getUserById);
router.get('/:assessmentId', authenticateUser,authorizeRole(["teacher","student","admin"]), assesmentController.getAssessmentById);
router.get('/course/:courseId', assesmentController.getAsssessmentByCourseId)
router.get('/user/:courseId', authenticateUser,authorizeRole(["teacher"]),assesmentController.getAsssessmentByCourseIdandSignInTeacher)
router.put('/',assesmentController.updateAssessment)

module.exports = router;
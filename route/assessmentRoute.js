const express = require('express');
const assesmentController = require('../controller/assessmentController');

const router = express.Router();

router.get('/', assesmentController.getAllAssessments);
router.post('/', assesmentController.createAssessment);
//router.get('/:userId', userController.getUserById);
router.get('/:assessmentId', assesmentController.getAssessmentById);
router.get('/course/:courseId', assesmentController.getAsssessmentByCourseId)
router.put('/',assesmentController.updateAssessment)

module.exports = router;
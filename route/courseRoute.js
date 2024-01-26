const express = require('express')

const router = express.Router()

const courseController = require('../controller/courseController')

router.post('/', courseController.createCourse)
router.get('/', courseController.getAllCourse)
router.get('/:courseId', courseController.getCourseById)
router.put('/', courseController.updateCourse)
module.exports = router
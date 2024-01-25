const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/');
router.post("/", userController.createUser)

module.exports = router;
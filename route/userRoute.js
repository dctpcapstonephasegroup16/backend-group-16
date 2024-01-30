const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/login', userController.userLogin);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.modifyUserAccount);

module.exports = router;
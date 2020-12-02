const express = require('express');

const router = express.Router();

const userController = require("../controllers/users_controller");

const auth = require("../middleware/auth");

router.get('/', userController.getAllUsers);

router.get('/:UserId', userController.getUserById);

router.get('/:UserId/cart', auth, userController.getUserCart );

router.post('/login', userController.login);

router.post('/', userController.createUser);

router.delete('/:UserId/cart', userController.deleteCart );

module.exports = router;
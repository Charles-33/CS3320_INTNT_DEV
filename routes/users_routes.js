const express = require('express');

const router = express.Router();

const userController = require("../controllers/users_controller");

router.get('/', userController.getAllUsers);

router.get('/:UserId', userController.getUserById);

router.get('/:UserId/cart', userController.getUserCart );

router.post('/', userController.createUser);

router.delete('/:UserId/cart', userController.deleteCart );

module.exports = router;
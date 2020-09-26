const express = require('express');

const router = express.Router();

const userControllers = require("../controllers/users_controller");

router.get('/:UserId', userControllers.getUserById);

router.get('/:UserId/cart', userControllers.getUserCart );

router.post('/', userControllers.createUser);

router.delete('/:UserId/cart', userControllers.deleteCart );

// TODO: Move to cart_routes.js after we implement database
router.post('/:CartId/cartItem', userControllers.addCartItem);
router.delete('/:CartId/cartItem/:cartItemId', userControllers.deleteCartItem);

module.exports = router;
const express = require('express');

const router = express.Router();

const cartController = require("../controllers/cart_controller");

router.post('/:CartId/cartItem', cartController.addCartItem);
router.delete('/:CartId/cartItem/:cartItemId', cartController.deleteCartItem);


module.exports = router;
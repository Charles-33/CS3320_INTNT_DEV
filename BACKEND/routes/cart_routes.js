const express = require('express');

const router = express.Router();

const cartController = require("../controllers/cart_controller");
const auth = require("../middleware/auth")
router.post('/:CartId/cartItem',  cartController.addCartItem);
router.delete('/:CartId/cartItem/:cartItemId', cartController.deleteCartItem);


module.exports = router;
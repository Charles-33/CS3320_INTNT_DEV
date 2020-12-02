const express = require('express');

const router = express.Router();

const storeController = require("../controllers/store_controller");

// As ugly as this looks, it does route me to the proper route instead of 
// colliding with the other get routes
router.get('/Recent', storeController.getLastTen );

router.get('/', storeController.getAllStoreItems);

router.post('/', storeController.createStoreItem );

router.get('/:StoreItemId', storeController.getStoreItem);

module.exports = router;
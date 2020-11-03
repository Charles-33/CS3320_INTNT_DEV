const express = require('express');

const router = express.Router();

const storeController = require("../controllers/store_controller");

router.get('/', storeController.getAllStoreItems);

router.post('/', storeController.createStoreItem );

// As ugly as this looks, it does route me to the proper route instead of 
// colliding with the other get routes
router.get(/^\/Recent(?:\/(?=$))?$/i, storeController.getLastTen );

router.get('/:StoreItemId', storeController.getStoreItem);



module.exports = router;
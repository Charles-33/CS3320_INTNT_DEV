const express = require('express');

const router = express.Router();

const storeController = require("../controllers/store_controller");

router.get('/:StoreItemId', storeController.getStoreItem);

router.get('/', storeController.storeQuery);



module.exports = router;
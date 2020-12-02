const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreItemSchema = new Schema({
    name: {type: String, required: true},
    quantity: { type: Number, required: true},
    cost: {type: Number, required: true}
});

module.exports = mongoose.model('StoreItem', StoreItemSchema);
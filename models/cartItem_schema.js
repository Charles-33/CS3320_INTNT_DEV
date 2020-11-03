const mongoose = require('mongoose');

const Schema = mongoose.Schema


const cartItemSchema = new Schema({
    parentCart: {type: mongoose.Types.ObjectId, ref:"Cart"},
    quantity: {type: Number, required:true },
    storeItemRef: { type:mongoose.Types.ObjectId, ref:"StoreItem"}
})


module.exports = mongoose.model('CartItem', cartItemSchema);
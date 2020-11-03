const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId,ref: 'User'},
    items: [{type:mongoose.Types.ObjectId, required:false, ref:'CartItem'}],
    total: {type: Number}
});




module.exports = mongoose.model('Cart', cartSchema);

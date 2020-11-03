const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Reference to cart does work 
const userSchema = new Schema({
    firstName : { type: String, required:true },
    lastName : {type : String, required:true},
    email : { type: String, required:true, unique: true },
    password: { type: String, required:true, minlength: 4 },
    cart: { type: mongoose.Types.ObjectId, ref: 'Cart'}
});

module.exports = mongoose.model('User', userSchema );
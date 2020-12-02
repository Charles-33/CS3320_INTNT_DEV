const User = require('../models/user_schema');
const Cart = require('../models/cart_schema');
const StoreItem = require('../models/storeItem_schema');
const CartItem = require('../models/cartItem_schema');

const addCartItem = async (req, res, next) => {
    let storeItemId = req.body.storeItemId;
    let storeItem = await StoreItem.findById(storeItemId).lean();
    if( !storeItem ){
        res.send(404);
    }

    const CartId = req.params.CartId;
    let destinationCart = await Cart.findById(CartId);
    let newCartItem =  new CartItem({
        parentCart: CartId,
        quantity: req.body.quantity,
        storeItemRef: storeItem._id
    });

    await newCartItem.save();
    destinationCart.total += ( storeItem.cost * req.body.quantity);
    destinationCart.items.push(newCartItem);
    await destinationCart.save();

    res.send(  destinationCart? destinationCart : 404);
    
}

const deleteCartItem = async (req, res) => {
    let CartId = req.params.CartId;
    let cartItemId = req.params.cartItemId;
    
    let userCart = await Cart.findById( CartId );
    let cartItem = await CartItem.findById( cartItemId);
    // let storeItem = await StoreItem.findById( cartItem.storeItemRef );

    // let subtractAmount = cartItem.quantity * storeItem.cost;

    console.log(cartItemId);
    await CartItem.findOneAndDelete({_id: cartItemId});
    
    // Keeps only the cartItemIds that do not match the one being deleted
    userCart.items = userCart.items.filter( id => id != cartItemId );
    // userCart.total -= subtractAmount;
    userCart.save();
    res.send( userCart );
}

exports.addCartItem = addCartItem;
exports.deleteCartItem = deleteCartItem;
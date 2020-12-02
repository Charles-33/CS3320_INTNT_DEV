const jwt = require('jsonwebtoken');
const accessTokenSecret = "example";
const User = require('../models/user_schema');
const Cart = require('../models/cart_schema');
const StoreItem = require('../models/storeItem_schema');
const CartItem = require('../models/cartItem_schema');


const getUserById = async(req, res) =>{
    let user;
    const UserId = req.params.UserId;

    try{
        user = await User.findById(UserId).lean();
    }catch(err){
        console.log(err);
    }
    res.send( user ? user : 404);
}

const getAllUsers =  async (req, res) => {
    let users;
    try{
        users = await User.find().lean();
    }catch(err){
        console.log(err);
    }
    res.send( users ? users: 404);
};

const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body; 

    const newUser = new User({
        firstName, lastName, email, password
    });

    const newCart = new Cart({
        total: 0,
    });

    newUser.cart = newCart._id;
    try{
        await newCart.save();
        await newUser.save();
    } catch(err){
        console.log(err);
    }
    
    res.send( newUser.toObject() ? newUser.toObject(): 404); 
}

const getUserCart = async (req, res, next ) => {
    let user;
    const UserId = req.params.UserId;

    try{
        user = await User.findById(UserId).lean();
    }catch(err){
        console.log(err);
    }
  
    const userCartId = user.cart;
    let userCart = await Cart.findOne({_id: userCartId}).lean().populate({
        path:'items',
        populate:{
            path:'storeItemRef',
            model:'StoreItem'
        }
    });
     res.send( userCart ? userCart : 404);
    
}

const login = async (req, res) => {
    const {email, password} = req.body;
    let foundUser;
    try {
        foundUser= await User.findOne({ email: email, password: password });
      } catch (err) {
        res.send(500);
    }
    let token;
  try {
    token = jwt.sign(
      { user: foundUser },
      accessTokenSecret
     
    );
  } catch (err) {
    res.send(500);
  }

   if( foundUser ){
       res.send({ jwt: token, userId: foundUser._id, user: foundUser});
   }
   res.send(token);
}
const deleteCart = async (req, res) => {
    const UserId = req.params.UserId;
    let userCart = await Cart.findOne({userId: UserId});
   
   for(  i = 0; i < userCart.items.length; i++ ){       
        await CartItem.findOneAndDelete({_id:userCart.items[i]});
   }
    
    userCart.items = [];
    userCart.total = 0;
    await userCart.save();
    res.send(userCart ? userCart : 404);
}


exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserCart = getUserCart;
exports.createUser = createUser;
exports.deleteCart = deleteCart;
exports.login = login;



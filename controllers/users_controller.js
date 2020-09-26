const DUMMY_USERS = [];
let userCount = 0;
const first_user = {
    "id": userCount,
    "firstName": "Chuck",
    "lastName": "Not Chuck",
    "email": "reddit@hotmail.com",
    "cartId": userCount,
    "cart" : [
       {
           "itemId": 0,
           "itemQuantity": 30
       }
    ]
}
DUMMY_USERS.push(first_user);
userCount += 1;

const getUserById =  (req, res) => {
    let foundUser = DUMMY_USERS.find( (user) => {return user.id == req.params.UserId });
    res.send(foundUser);
};

const getUserCart = (req, res ) => {
    let foundUser = DUMMY_USERS.find( (user) => { return user.id == req.params.UserId });
    res.send(foundUser.cart);
}
const createUser = (req, res) => {
    let newUser = {};

    newUser.id = userCount;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;

    DUMMY_USERS.push( newUser );
    userCount += 1;
    return res.send( newUser );
}

const deleteCart = (req, res) => {
    let foundUser = DUMMY_USERS.find( (user) => { return user.id == req.params.UserId });
    foundUser.cart = {};
    res.status(200).json({ message: 'Emptied user cart.'});
}



exports.getUserById = getUserById;
exports.getUserCart = getUserCart;
exports.createUser = createUser;
exports.deleteCart = deleteCart;


// TODO: Move to routes-controller once we get a database
const addCartItem = (req, res) => {
    let foundUser = DUMMY_USERS.find( (user) => { return user.cartId == req.params.CartId });
    let userCart = foundUser.cart;
    let newCartItem = {};
    newCartItem.itemId = req.body.itemId;
    newCartItem.itemQuantity = req.body.itemQuantity;
    userCart.push(newCartItem);
    res.status(200).json({message: 'Item was added to the cart.'});

}

const deleteCartItem = (req, res) => {
    let foundUser = DUMMY_USERS.find( (user) => { return user.cartId == req.params.CartId });
    foundUser.cart = foundUser.cart.filter( item => item.itemId !== req.params.cartItemId);
    if( req.params.cartItemId == "0"){
        foundUser.cart = {};
    }
    res.status(200).send(foundUser.cart);

}
exports.addCartItem = addCartItem;
exports.deleteCartItem = deleteCartItem;
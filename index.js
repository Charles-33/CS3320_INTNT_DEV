const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userRoutes = require("./routes/users_routes");
const storeRoutes = require("./routes/store_routes");
const cartRoutes = require("./routes/cart_routes");

const app = express();
app.use(express.json());



mongoose.connect('mongodb+srv://Charles:Cs3320@cluster0.xyuuh.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then( () =>{
        app.use(session({
            secret:"iHopeThisWorks",
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use('/user', userRoutes);
        app.use('/cart', cartRoutes);
        app.use('/storeItem', storeRoutes);
        app.listen(8080);})
    .catch( err => {
        console.log(err);
    });


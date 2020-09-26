const express = require('express');

const userRoutes = require("./routes/users_routes");
const storeRoutes = require("./routes/store_routes");

const app = express();
app.use(express.json());

// Keeps route logic outside of index.js 
app.use('/user', userRoutes);

// For now /cart will point to user routes, when we get a database I will move all cart logic
// to cart_routes
app.use('/cart', userRoutes);

app.use('/StoreItem', storeRoutes);

app.listen(8080);
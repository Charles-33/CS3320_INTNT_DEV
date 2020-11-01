const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://Charles:CS3320charles@cluster0.xyuuh.mongodb.net/dbExample?retryWrites=true&w=majority"

const client = new MongoClient( url, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = 'dbExample';
let database;
const initDatabase = async() =>{
    try{
        const connection = await client.connect();
    if( connection ){
        console.log("Connected to my DB");
        database = client.db(dbName);
        const collection = database.collection('collectionExample');

        const result = collection.insertMany([{a:1}, {a:2}, {a:3}]);
        console.log(`Successfully inserted: ${JSON.stringify(result)}`);
    }
    } catch(err){
        console.log(err.stack);
    } 
   finally{

   } 
    
}
const init= async () => {
    await initDatabase();
}

init();

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
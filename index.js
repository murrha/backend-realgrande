//importing all necessary modules - express, mongoose, dotenv
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
dotenv.config(); 

//require CORS and select CORS policy
const cors = require('cors'); 
let corspolicy = {
    origin:process.env.FRONTEND_URL
}


//importing routes
const allRouter = require('./routes/allRoutes'); 

//creating an instance of an express object
const app = express();

//needed or else it won't do so on post
app.use(express.json());
app.use(cors(corspolicy));

//establishing connection using mongoose
const db = module.exports = async () => {
    try{
        //need to mention name of database from Atlas
        await mongoose.connect( process.env.DBURI, { 	user: process.env.DBUSERNAME, pass: 	process.env.DBPASSWORD, useNewUrlParser: true, 	useUnifiedTopology: true })

            console.log("MongoDB Connection is Successful")
        } catch(error){
            console.log(error);
            console.log("MongoDB Connection is failed")
        } 
}

db();


//to check if a connection has been established
app.use('/', (req, res, next) => {
    console.log("A connection has been established on " + new Date(Date.now()));

    //will go to next handler to handle other requests
    next();
})

//using imported routers
app.use('/', allRouter); 

//will be keeping the port in .env file
app.listen(process.env.PORT, () => {
    console.log(`Real Grande server listening at http://3.82.122.5:${process.env.PORT}`);
})

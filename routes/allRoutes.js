//DONE IN CLASS

const express = require('express');
const multer = require('multer'); 
let getFields = multer();

const {Houses, Users, Enquiries} = require('../models/allSchemas'); 
const allRouter = express.Router(); 

allRouter.get('/', async (req, res) => {
    const housesData = await Houses.find({});
    try{
        res.send(housesData);
    }catch(error){
        res.status(500).send(error);
    }
})

//to store the user data
allRouter.post('/signup', getFields.none(), async (req, res) => {
    try{
        const newUser = new Users(req.body); 
        let user = await newUser.save();
        user = user.toObject();
        
        if(user){
            res.send(user); 
        }else{
            res.send("User already exists");
        }
        
    }catch(error){
        res.status(500).send(error);
    }
})

allRouter.post('/login', getFields.none(), async (req, res) => {

    let user = await Users.findOne({
        email: req.body.email,
        password: req.body.password
    })
    try{

        if(user){
            res.send(user);
        }else{
            res.send('Authentication Failed! :(');
        }
         
    }catch(error){
        res.status(500).send(error);
    }
})

//storing enquiries
allRouter.post('/register', getFields.none(), async (req, res) => {

    const newEnquiry = new Enquiries(req.body);
    let enquiry = await newEnquiry.save();
    enquiry = enquiry.toObject(); 
    console.log(enquiry);

    try{
        res.send(enquiry);
         
    }catch(error){
        res.status(500).send(error);
    }
})

//storing enquiries
allRouter.get('/allenquiries', async (req, res) => {

    const enquiryData = await Enquiries.find({}).sort({date: -1});
    try{
        res.send(enquiryData);
         
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = allRouter; 
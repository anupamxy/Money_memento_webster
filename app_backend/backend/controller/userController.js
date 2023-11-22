const express = require('express');
const asyncHandler = require("express-async-handler");
// A custom middleware for handling asynchronous operations and error handling.
const User = require('../models/user');
const generateToken = require('../config/generateToken');
const router = express.Router();

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "Please enter all the fields" });
        return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        pic: pic || 'https://up.yimg.com/ib/th?id=OIP.1DLYAqE5UY19idJJOkFQegHaHa&%3Bpid=Api&w=474&c=1&rs=1&qlt=95'
    }) 
    

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: "User could not be created" });
    }
});
const authUser=asyncHandler(async(req,res)=>{

    const{email,password}=req.body;
    const user=await User.findOne({email});
    if(user&&user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid password or mail id")
    }

})
//by this controller we are doing our searching operation 
const allUsers=asyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},//regex is mongoose library that was used for searching operation when we move to
            //its website we see that there was various way for searching operation here we are doing by i means it accept both uppercase and
            //lower case
            {name:{$regex:req.query.search,$options:"i"}},

        ]

    }:
    {

    };
    const users=await User.findOne(keyword).find({_id:{$ne:req.user_id}});
    res.send(users);


});

router.route('/').post(registerUser).get(allUsers);
router.route('/login').post(authUser);
module.exports = router;

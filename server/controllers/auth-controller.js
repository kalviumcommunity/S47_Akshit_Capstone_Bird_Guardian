const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PostModel = require('../models/Post');
const UserModel = require('../models/User');




const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
          return res.status(400).json({ message: 'Name or email already exists' });
        }

        const newUser = new UserModel({
          name,
          email,
          password
        });

        await newUser.save();

        res.status(201).json({newUser , token : await newUser.generateAuthToken(), userId : newUser._id.toString()});
      } catch (error) {

        if (error.code === 11000) {
          return res.status(400).json({ error: 'Email or name already exists.' });
        }
        next(error);
      }
};




const SignIn = async (req, res) => {
    try{
        const {email, password} = req.body;

        const existingUser = await UserModel.findOne({ email });
        
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordCorrect = await existingUser.comparePassword(password);
    
        if (isPasswordCorrect) {
            res.status(200).json({msg : "SignIn Successful" , token : await existingUser.generateAuthToken(), userId : existingUser._id.toString()});
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        next(error);
    }
};



const GetUser = async (req, res) => {
    try {
        const userData = req.GetUser;
        
        return res.status(200).json( {userData} ); 
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};



const OnlyToSeeUser = async (req, res) => {
    try {
        const SeeUser = await UserModel.find();
        res.json(SeeUser);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }




module.exports = {SignIn, SignUp, GetUser, OnlyToSeeUser}

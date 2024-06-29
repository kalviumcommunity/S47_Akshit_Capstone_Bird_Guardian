const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PostModel = require('../models/Post');
const UserModel = require('../models/User');


// # ------------------ # 
// Posts page Logic
// # ------------------ # 

const GetPost = async (req, res) => {
    try {
        // Retrieve posts from the database
        const posts = await PostModel.find();
    
        // Map each post to a new object with optional photoSrc
        const postsWithPhotos = posts.map(post => {
          if (post.photo) {
            const base64Photo = Buffer.from(post.photo).toString('base64');
            const photoSrc = `data:image/jpeg;base64,${base64Photo}`;
            return { ...post.toObject(), photoSrc };
          } else {
            return post.toObject();
          }
        });
    
        res.json(postsWithPhotos);
      } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "An error occurred while fetching posts." });
      }
    };


// # ------------------ #
// Posting a post logic
// # ------------------ #

const UploadingPost =  async (req, res) => {
    try {
        const { body, file } = req;

        // Convert the file buffer to photoBuffer if provided
        const photoBuffer = file ? file.buffer : undefined;

        const newPost = new PostModel({
            ...body,
            photo: photoBuffer
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(400).json({ message: "An error occurred while creating the post." });
    }
};


// # ------------------ # 
// Updating a Post logic
// # ------------------ #


const UpdatingPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, file } = req;

        let existingPost = await PostModel.findById(id);

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Update the photo only if a new photo is provided
        if (file) {
            existingPost.photo = file.buffer;
        }

        // Replace the existing post's body with the new body
        Object.assign(existingPost, body);

        const updatedPost = await existingPost.save();

        res.json(updatedPost);
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(400).json({ message: "An error occurred while updating the post." });
    }
}

// # ------------------ # 
// Delete a Post logic
// # ------------------ #

const DeletingPost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const deletedPost = await PostModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }


        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(400).json({ message: "An error occurred while deleting the post." });
    }
};


// # ------------------ # 
// Sign Up Logic
// # ------------------ # 

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
  
  
      //   valideate user already exists or not
        const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
          return res.status(400).json({ message: 'Name or email already exists' });
        }
    
    
        // Create a new user
        const newUser = new UserModel({
          name,
          email,
          password
        });
    
        // Save the user to the database
        await newUser.save();
    
        // Respond with the created user
        res.status(201).json({newUser , token : await newUser.generateAuthToken(), userId : newUser._id.toString()});
      } catch (error) {
        // Handle errors
        if (error.code === 11000) {
          return res.status(400).json({ error: 'Email or name already exists.' });
        }
        next(error);
      }
};


// # ------------------ # 
// Sign In Logic
// # ------------------ # 

const SignIn = async (req, res) => {
    try{
        const {email, password} = req.body;

        const existingUser = await UserModel.findOne({ email });
        console.log(existingUser);
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


// # ------------------ # 
// Logic to get data of auth user
// # ------------------ # 
const GetUser = async (req, res) => {
    try {
        const userData = req.GetUser;
        console.log(userData);
        return res.status(200).json( {userData} ); 
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

// # ------------------ # 
// Logic to get all data of users
// # ------------------ # 
const OnlyToSeeUser = async (req, res) => {
    try {
        const SeeUser = await UserModel.find();
        res.json(SeeUser);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }




module.exports = {GetPost, SignIn, SignUp, GetUser, UploadingPost, UpdatingPost, DeletingPost, OnlyToSeeUser}


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { connectDB, mongoose } = require('./config/dbConn');
const PostModel = require('./models/Post');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Connect to DB
connectDB(process.env.DATABASE_URI);

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));


const upload = multer({ storage: multer.memoryStorage() });

// Routes
app.get('/Post', async (req, res) => {
    try {
        // Retrieve posts from the database
        const posts = await PostModel.find();

        // Map each post to a new object with optional photo URL
        const postsWithPhotos = posts.map(post => {
            if (post.photo) {
                const base64Photo = post.photo.toString('base64');
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
});

app.post('/PostYourPosts', upload.single('photo'), async (req, res) => {
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
});


app.put('/update/Post/:id', upload.single('photo'), async (req, res) => {
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
});


app.delete('/delete/Post/:id', async (req, res) => {
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
});


// Define the route to post user data (SIGN UP)
app.post('/postusers', async (req, res) => {
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
      res.status(201).json(newUser);
    } catch (error) {
      // Handle errors
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Email or name already exists.' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // GET route to retrieve all users
app.get('/getusers', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

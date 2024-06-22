require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require('body-parser');
const { connectDB, mongoose } = require('./config/dbConn');
const PostModel = require('./models/Post');
const UserModel = require('./models/User');

// Connect to DB
connectDB(process.env.DATABASE_URI);

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

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
        const posts = await PostModel.find();
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "An error occurred while fetching posts." });
    }
});

app.post('/PostYourPosts', upload.single('photo'), async (req, res) => {
    try {
        const { body, file } = req;
        let photoBuffer;

        if (file) {
            photoBuffer = file.buffer;
        } else if (body.photo) {
            const base64Data = body.photo.split(',')[1];
            photoBuffer = Buffer.from(base64Data, 'base64');
        }

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
        const updateData = {
            ...body,
            photo: file ? file.buffer : undefined
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedPost);
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(400).json({ message: "An error occurred while updating the post." });
    }
});


// Define the route to post user data
app.post('/postusers', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
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

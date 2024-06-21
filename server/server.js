// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer"); // Add multer for file uploads
const { connectDB, mongoose } = require('./config/dbConn');
const PostModel = require('./models/Post');

// Connect to DB
connectDB(process.env.DATABASE_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
/* When you fill out a form on a website and hit submit, the data from that form is sent to the server. The server needs to understand this
 data to do something with it (like save it to a database). This line of code makes sure the server can understand the form data. */ 


const upload = multer(); // Initialize multer


// Routes

// get Method route
app.get('/Post', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "An error occurred while fetching posts." });
    }
});


// Post/put Method route
app.post('/PostYourPosts', upload.single('photo'), async (req, res) => {
    try {
        const { body, file } = req;
        const newPost = new PostModel({
            ...body,
            photo: file ? file.buffer : undefined // Handle file upload
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(400).json({ message: "An error occurred while creating the post." });
    }
});


// update Method route
app.put('/update/Post/:id', upload.single('photo'), async (req, res) => {
    try {
        const { id } = req.params;
        const { body, file } = req;
        const updateData = {
            ...body,
            photo: file ? file.buffer : undefined
        };

        // I am checking the id if prsent or not. (Validate ObjectId)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        // Find and update the post
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

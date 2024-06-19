// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PostModel = require('./models/Post');

// Importing mongoDb from config
const connectDB = require('./config/dbConn');

// connect to DB
connectDB(process.env.DATABASE_URI);

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/Post', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (err) {
        console.error(err); // Add logging for errors
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

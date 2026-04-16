const mongoose = require("mongoose");

const connectDB = async (DATABASE_URI) => {
    try {
        
        await mongoose.connect(DATABASE_URI);
        
        
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};

module.exports = { mongoose, connectDB };

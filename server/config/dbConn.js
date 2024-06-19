
const mongoose = require("mongoose");

const connectDB = async (DATABASE_URI) => {
    if (mongoose.connection.readyState >= 1) {
        // If already connected, do not attempt to reconnect
        console.log("Already connected to database");
        return;
    }
    try {
        console.log("Connecting to database...");
        await mongoose.connect(DATABASE_URI);
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

module.exports = connectDB;

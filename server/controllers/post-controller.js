const mongoose = require('mongoose');
const PostModel = require('../models/Post');
const sharp = require('sharp');

/**
 * Utility to optimize images before saving to database
 * Uses sharp to resize and convert to webp format for better performance
 */
const optimizeImage = async (buffer) => {
    if (!buffer) return undefined;
    try {
        return await sharp(buffer)
            .resize({
                width: 1000, 
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: 80 })
            .toBuffer();
    } catch (err) {
        console.error("Image optimization failed:", err);
        return buffer; 
    }
};

/**
 * GET /api/posts - Fetch all posts (fast, no images)
 */
const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find().select('-photo').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        next({
            status: 500,
            message: "Failed to fetch posts",
            extraDetails: err.message
        });
    }
};

/**
 * GET /api/posts/:id - Fetch single post (fast, no image)
 */
const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next({ status: 400, message: "Invalid post ID" });
        }

        const post = await PostModel.findById(id).select('-photo');

        if (!post) {
            return next({ status: 404, message: "Post not found" });
        }
        
        res.status(200).json(post);
    } catch (err) {
        next({
            status: 500,
            message: "Error fetching post details",
            extraDetails: err.message
        });
    }
};

/**
 * GET /api/posts/photo/:id - Stream raw photo directly
 */
const getPostPhoto = async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id).select('photo');
        if (!post || !post.photo) {
            return res.status(404).send("Photo not found");
        }
        
        const photoBuffer = post.photo;
        const isWebP = photoBuffer.slice(8, 12).toString() === 'WEBP';
        
        res.set('Content-Type', isWebP ? 'image/webp' : 'image/jpeg');
        res.send(photoBuffer);
    } catch (err) {
        next({
            status: 500,
            message: "Error streaming photo",
            extraDetails: err.message
        });
    }
};

/**
 * GET /api/posts/myposts - Fetch user's posts (fast, no images)
 */
const getMyPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find({ userId: req.userID }).select('-photo').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        next({
            status: 500,
            message: "Failed to fetch your posts",
            extraDetails: err.message
        });
    }
};

/**
 * POST /api/posts - Create a new bird sighting
 */
const createPost = async (req, res, next) => {
    try {
        const { body, file } = req;
        const photoBuffer = file ? await optimizeImage(file.buffer) : undefined;

        const newPost = new PostModel({
            ...body,
            email: req.GetUser.email, 
            photo: photoBuffer,
            userId: req.userID 
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        next({
            status: 400,
            message: "Failed to create sighting report",
            extraDetails: err.message
        });
    }
};

/**
 * PATCH /api/posts/:id - Update an existing sighting
 */
const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body, file } = req;

        let existingPost = await PostModel.findById(id);

        if (!existingPost) {
            return next({ status: 404, message: "Post not found" });
        }

        // Ownership Check
        if (existingPost.userId && existingPost.userId.toString() !== req.userID.toString()) {
            return next({ status: 403, message: "Unauthorized: You do not own this post" });
        }

        if (file) {
            existingPost.photo = await optimizeImage(file.buffer);
        }

        // Exclude sensitive fields from bulk update
        const { email, userId, ...updateData } = body; 
        Object.assign(existingPost, updateData);
        existingPost.email = req.GetUser.email; 
        
        const updatedPost = await existingPost.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        next({
            status: 400,
            message: "Failed to update sighting report",
            extraDetails: err.message
        });
    }
}

/**
 * DELETE /api/posts/:id - Remove a sighting record
 */
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next({ status: 400, message: "Invalid post ID" });
        }

        const post = await PostModel.findById(id);

        if (!post) {
            return next({ status: 404, message: "Post not found" });
        }

        // Ownership Check
        if (post.userId && post.userId.toString() !== req.userID.toString()) {
            return next({ status: 403, message: "Unauthorized: You do not own this post" });
        }

        await PostModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        next({
            status: 400,
            message: "Failed to delete sighting record",
            extraDetails: err.message
        });
    }
};

module.exports = {
    getPosts,
    getPostById,
    getPostPhoto,
    getMyPosts,
    createPost,
    updatePost,
    deletePost
};

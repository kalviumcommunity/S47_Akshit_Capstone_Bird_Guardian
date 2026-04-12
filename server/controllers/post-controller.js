const mongoose = require('mongoose');
const PostModel = require('../models/Post');




const GetPost = async (req, res) => {
    try {

        const posts = await PostModel.find();

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




const UploadingPost =  async (req, res) => {
    try {
        const { body, file } = req;

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




const UpdatingPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, file } = req;

        let existingPost = await PostModel.findById(id);

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (file) {
            existingPost.photo = file.buffer;
        }

        Object.assign(existingPost, body);

        const updatedPost = await existingPost.save();

        res.json(updatedPost);
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(400).json({ message: "An error occurred while updating the post." });
    }
}




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

module.exports = {
    GetPost,
    UploadingPost,
    UpdatingPost,
    DeletingPost
};

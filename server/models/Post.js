const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birdType: { type: String, required: true },
  birdColor: { type: String, required: true },
  photo: { type: Buffer }, // Change photo to Buffer for file uploads and make it optional
  address: { type: String, required: true },
  email: { type: String, required: true }, 
  description: { type: String, required: true },
}, { 
  collection: 'Post',
  toJSON: { 
    versionKey: false, // Remove `__v`
    transform: function (doc, ret) { 
      delete ret.__v; // Ensure `__v` is removed
      return ret;
    }
  },
  toObject: { 
    versionKey: false, // Remove `__v`
    transform: function (doc, ret) { 
      delete ret.__v; // Ensure `__v` is removed
      return ret;
    }
  }
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;

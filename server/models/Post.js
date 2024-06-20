const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birdType: { type: String, required: true },
  birdColor: { type: String, required: true },
  photo: { type: Buffer }, // Change photo to Buffer for file uploads and make it optional
  address: { type: String, required: true },
  email: { type: String, required: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
  description: { type: String, required: true },
}, { collection: 'Post' });

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;

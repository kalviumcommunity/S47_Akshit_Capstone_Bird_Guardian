const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birdType: { type: String, required: true },
  birdColor: { type: String, required: true },
  photo: { type: Buffer },
  address: { type: String, required: true },
  email: { type: String, required: true }, 
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { 
  collection: 'Post',
  timestamps: true,
  toJSON: { 
    versionKey: false,
    transform: function (doc, ret) { 
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    versionKey: false,
    transform: function (doc, ret) { 
      delete ret.__v;
      return ret;
    }
  }
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;

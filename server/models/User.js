const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
}, { collection: 'User', 
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

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

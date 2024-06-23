const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

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

// secure the password with the bcrypt
UserSchema.pre('save', async function (next) {  // Pre-save middleware means that we wrote 'save' and outside that pre means before the data is saved in the database, the function will run (which fn? => function()...)
  if (!this.isModified('password')) {  // here this refers to the data (in object like name : "ram", email :"...", password: "....")
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

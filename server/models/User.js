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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign(
      {
        userId : this._id.toString(),
        email : this.email
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '6h'
      }
  );

  } catch (error) {
    console.error('Error generating token:', error);
  };
};



const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

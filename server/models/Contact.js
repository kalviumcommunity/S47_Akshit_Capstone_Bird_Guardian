const {Schema, model} = require('mongoose');

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { 
    collection: 'Contact',
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


// create a model or collection
const ContactModel = model('Contact', ContactSchema);

module.exports = ContactModel
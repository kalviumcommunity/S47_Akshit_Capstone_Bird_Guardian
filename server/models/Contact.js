const {Schema, model} = require('mongoose');

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { 
    collection: 'Contact',
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

const ContactModel = model('Contact', ContactSchema);

module.exports = ContactModel
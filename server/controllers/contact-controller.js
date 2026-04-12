const ContactModel = require('../models/Contact');

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await ContactModel.create(response);
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error('Error submitting form:', err);
        res.status(500).json({ message: 'An error occurred while submitting the form' });
    }
};

module.exports = contactForm; 
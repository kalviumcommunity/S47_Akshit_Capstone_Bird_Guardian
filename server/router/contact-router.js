const express = require('express');
const router = express.Router();
const contactForm = require('../controllers/contact-controller');



// router.route('/getcontact').get()

router.route('/contact').post(contactForm)


module.exports = router
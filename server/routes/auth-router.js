const express = require('express');
const router = express.Router();
const multer = require("multer");
const Schema = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware')
const logic = require('../controllers/auth-controller');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/signup').post( validate(Schema.signupSchema), logic.SignUp)

router.route('/signin').post( validate(Schema.signinSchema) , logic.SignIn)

router.route('/me').get( authMiddleware , logic.GetUser)

router.route('/users').get(logic.OnlyToSeeUser)

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require("multer");
const Schema = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware')
const logic = require('../controllers/auth-controller');
const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require('../middlewares/auth-middleware');

// get route for all posts
router.route('/getPost').get(logic.GetPost)

// post route for uploading posts
router.route('/uploadPost').post(upload.single('photo'), logic.UploadingPost);

// put route for updating posts
router.route('/updatePost/:id').put(upload.single('photo'), logic.UpdatingPost);

// delete route for deleting posts
router.route('/deletePost/:id').delete(logic.DeletingPost);

// route for register or Sign up
router.route('/postusers').post( validate(Schema.signupSchema), logic.SignUp)

// route for login or Sign in
router.route('/signin').post( validate(Schema.signinSchema) , logic.SignIn)

//  get route for seeing all users
router.route('/getusers').get( logic.GetUser)

// 

module.exports = router;
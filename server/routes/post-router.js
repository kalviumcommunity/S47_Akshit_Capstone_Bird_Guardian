const express = require('express');
const router = express.Router();
const multer = require("multer");
const postController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const validate = require('../middlewares/validate-middleware');
const { postSchema } = require('../validators/post-validator');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Protected routes (Login required)
router.route('/myposts').get(authMiddleware, postController.getMyPosts);

router.route('/create').post(
    authMiddleware, 
    upload.single('photo'), 
    validate(postSchema), 
    postController.createPost
);

router.route('/update/:id').put(
    authMiddleware, 
    upload.single('photo'), 
    validate(postSchema), 
    postController.updatePost
);

router.route('/delete/:id').delete(authMiddleware, postController.deletePost);

// Public routes
router.route('/').get(postController.getPosts);
router.get('/photo/:id', postController.getPostPhoto);
router.get('/:id', postController.getPostById);

// Legacy/Compatibility Alias
router.get('/update/:id', postController.getPostById);

module.exports = router;

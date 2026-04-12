const express = require('express');
const router = express.Router();
const multer = require("multer");
const logic = require('../controllers/post-controller');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/').get(logic.GetPost);

router.route('/create').post(upload.single('photo'), logic.UploadingPost);

router.route('/update/:id').put(upload.single('photo'), logic.UpdatingPost);

router.route('/delete/:id').delete(logic.DeletingPost);

module.exports = router;

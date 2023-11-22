const express = require('express');
const upload = require('./../middleware/upload');
const { uploadImage, getImage } = require('./../controller/image-controller');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', getImage);

module.exports = router;

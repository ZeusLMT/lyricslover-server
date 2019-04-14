const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');

const controller = require('../controllers/album.controller');

router.post('/', upload.single('artwork'), controller.createAlbum);

module.exports = router;
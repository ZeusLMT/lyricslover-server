const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');

const controller = require('../controllers/album.controller');

router.post('/', upload.single('artwork'), controller.createAlbum);

router.get('/', controller.getAll);

router.get('/search', controller.getAlbumsByProperties);

router.get('/:id', controller.getAlbumById);

router.get('/:id/artwork', controller.getArtwork);

router.delete('/:id', controller.deleteAlbum);

router.patch('/:id', upload.single('artwork'), controller.updateAlbum);

module.exports = router;
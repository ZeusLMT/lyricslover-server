const express = require('express');
const router = express.Router();

router.use('/artist', require('./artist.router'));
router.use('/song', require('./song.router'));
router.use('/album', require('./album.router'));

module.exports = router;
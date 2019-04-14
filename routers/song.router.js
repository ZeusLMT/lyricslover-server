const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const controller = require('../controllers/song.controller');

router.post('/', urlencodedParser, controller.createSong);

router.get('/', controller.getAllSongs);

module.exports = router;
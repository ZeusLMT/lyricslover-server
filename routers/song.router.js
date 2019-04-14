const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const controller = require('../controllers/song.controller');

router.post('/', urlencodedParser, controller.createSong);

router.get('/', controller.getAll);

router.get('/:id', controller.getSongById);

router.patch('/:id', urlencodedParser, controller.updateSong);

router.delete('/:id', controller.deleteSong);

module.exports = router;
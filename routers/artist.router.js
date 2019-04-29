const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const controller = require('../controllers/artist.controller');

router.post('/', urlencodedParser, controller.createArtist);

router.get('/', controller.getAll);

router.get('/:id', controller.getArtistById);

router.patch('/:id', controller.updateArtist);

module.exports = router;
const database = require('./database');
const path = require('path');
const Resize = require('../middlewares/sharp');

exports.createAlbum = (req, res) => {
    const imagePath = path.join('./public/uploads');
    const fileUpload = new Resize(imagePath);

    if (!req.file) {
        database.saveAlbum(req.body, () => {
            res.send('without artwork');
        });
    } else {
        fileUpload.save(req.file.buffer, (artwork) => {
            //New JSON file
            const newJson = {...req.body, artwork};
            //Save to Mongo DB
            database.saveAlbum(newJson, () => {
                res.send('with artwork');
            });
        });
    }
};

exports.getAll = (req, res) => {
    database.getAllAlbums((results) => {
        res.json(results);
    })
};
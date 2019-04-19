const database = require('./database');
const path = require('path');
const Resize = require('../middlewares/sharp');
const fs = require('../middlewares/fs');

exports.createAlbum = (req, res) => {
    const imagePath = path.join('./public/uploads');
    const fileUpload = new Resize(imagePath);

    if (!req.file) {
        database.saveAlbum(req.body, (result) => {
            res.status(201).json(result);
        });
    } else {
        fileUpload.save(req.file.buffer, (artwork) => {
            //New JSON file
            const newJson = {...req.body, artwork};
            //Save to Mongo DB
            database.saveAlbum(newJson, (result) => {
                res.status(201).json(result);
            });
        });
    }
};

exports.getAll = (req, res) => {
    database.getAllAlbums((results) => {
        res.status(200).json(results);
    })
};

exports.deleteAlbum = (req, res) => {
    if (req.params.id !== undefined) {
        database.getAlbumByProperties({_id: req.params.id}, (result) => {
            const deletePath = `.\\public\\${result.artwork}`;
            console.log(deletePath);
            fs.deleteFile(deletePath);
        });
        database.deleteAlbumAndReferences(req.params.id, () => {
            res.sendStatus(200);
        });
    } else {
        res.status(400).send("Error deleting album: album id error.");
    }
};
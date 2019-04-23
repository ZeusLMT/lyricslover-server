const database = require('./database/database.album');
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

exports.getArtwork = (req, res) => {
    if (req.params.id !== undefined) {
        database.getArtworkOnly(req.params.id, (result) => {
            res.status(200).json(result);
        })
    } else {
        res.status(400).send("Error deleting album: album id error.");
    }
};

exports.deleteAlbum = (req, res) => {
    if (req.params.id !== undefined) {
        database.getAlbumByProperties({_id: req.params.id}, (result) => {
            if (result.artwork !== undefined) {
                //Delete previous artwork
                const deletePath = `.\\public\\${result.artwork}`;
                fs.deleteFile(deletePath);
            }
        });
        database.deleteAlbumAndReferences(req.params.id, () => {
            res.sendStatus(200);
        });
    } else {
        res.status(400).send("Error deleting album: album id error.");
    }
};

exports.updateAlbum = (req, res) => {
    const imagePath = path.join('./public/uploads');
    const fileUpload = new Resize(imagePath);

    if (req.params.id !== undefined) {
        if (!req.file) {
            //Update without new artwork
            database.updateAlbum(req.params.id, req.body, (newResult) => {
                res.status(200).json(newResult);
            });
        } else {
            //Check if album already has artwork
            database.getAlbumByProperties({_id: req.params.id}, (result) => {
                if (result.artwork !== undefined) {
                    //Delete previous artwork
                    const deletePath = `.\\public\\${result.artwork}`;
                    fs.deleteFile(deletePath);
                }
            });

            //Update with new artwork
            fileUpload.save(req.file.buffer, (artwork) => {
                //New JSON file
                const newJson = {...req.body, artwork};
                //Save to Mongo DB
                database.updateAlbum(req.params.id, newJson, (newResult) => {
                    res.status(200).json(newResult);
                });
            });
        }
    } else {
        res.status(400).send("Error updating album: album id error.");
    }
};
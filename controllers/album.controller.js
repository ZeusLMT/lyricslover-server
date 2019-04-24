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
    });
};

exports.getAlbumsByProperties = (req, res) => {
    database.getAlbumsByProperties(req.query, (results) => {
        res.status(200).json(results);
    })
};

exports.getAlbumById = (req, res) => {
    if (req.params.id !== undefined) {
        const query = {_id: req.params.id};
        database.getAlbumsByProperties(query, (results) => {
            res.status(200).json(results[0]);
        });
    } else {
        res.send("Error getting album.");
    }
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
        database.getAlbumsByProperties({_id: req.params.id}, (results) => {
            if (results[0].artwork !== undefined) {
                //Delete previous artwork
                const deletePath = `.\\public\\${results[0].artwork}`;
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
            database.getAlbumsByProperties({_id: req.params.id}, (results) => {
                if (results[0].artwork !== undefined) {
                    //Delete previous artwork
                    const deletePath = `.\\public\\${results[0].artwork}`;
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
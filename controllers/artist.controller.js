const database = require('./database/database.artist');

exports.createArtist = (req, res) => {
    if (req.body !== undefined) {
        database.saveArtist(req.body, (result) => {
            res.status(201).json(result);
        });
    }
};

exports.getAll = (req, res) => {
    database.getAllArtists((results) => {
        res.status(200).json(results);
    })
};

exports.getArtistById = (req, res) => {
    if (req.params.id !== undefined) {
        const query = {_id: req.params.id};
        database.getArtistsByProperties(query, (results) => {
            res.status(200).json(results[0]);
        });
    } else {
        res.send("Error getting artist.");
    }
};

exports.updateArtist = (req, res) => {
    if (req.params.id !== undefined) {
        database.updateArtist(req.params.id, req.body, (newResult) => {
            res.status(200).json(newResult);
        });
    } else {
        res.status(400).send("Error updating artist: artist id error.");
    }
};
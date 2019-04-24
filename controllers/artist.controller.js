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
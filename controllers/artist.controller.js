const database = require('./database');

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
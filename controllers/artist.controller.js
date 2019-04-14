const database = require('./database');

exports.createArtist = (req, res) => {
    if (req.body !== undefined) {
        database.saveArtist(req.body, () => {
            res.sendStatus(201);
        });
    }
};

exports.getAll = (req, res) => {
    database.getAllArtists((results) => {
        res.status(200).json(results);
    })
};
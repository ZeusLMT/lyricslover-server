const database = require('./database');

exports.createSong = (req, res) => {
    if (req.body !== undefined) {
        database.saveSong(req.body, () => {
            res.status(201);
        });
    }
};

exports.getAll = (req, res) => {
    database.getAllSongs((results) => {
        res.status(200).json(results);
    })
};

exports.getSongById = (req, res) => {
    if (req.params.id !== undefined) {
        const query = {_id: req.params.id};
        database.getSongByProperties(query, (result) => {
            res.status(200).json(result);
        });
    } else {
        res.send("Error getting all songs.");
    }
};

exports.updateSong = (req, res) => {
    if (req.params.id !== undefined) {
        database.updateSong(req.params.id, req.body, (newResult) => {
            res.status(200).json(newResult);
        });
    } else {
        res.status(400).send("Error updating song: song id error.");
    }
};

exports.deleteSong = (req, res) => {
    if (req.params.id !== undefined) {
        database.deleteSongAndReferences(req.params.id, () => {
            res.status(200);
        });
    } else {
        res.status(400).send("Error deleting song: song id error.");
    }
};
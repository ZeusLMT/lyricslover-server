const database = require('./database/database.song');

exports.createSong = (req, res) => {
    if (req.body !== undefined) {
        database.saveSong(req.body, (result) => {
            res.status(201).json(result);
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
        database.getSongsByProperties(query, (results) => {
            res.status(200).json(results[0]);
        });
    } else {
        res.send("Error getting song.");
    }
};

exports.getSongsByProperties = (req, res) => {
    database.getSongsByProperties(req.query, (results) => {
        res.status(200).json(results);
    })
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
            res.sendStatus(200);
        });
    } else {
        res.status(400).send("Error deleting song: song id error.");
    }
};
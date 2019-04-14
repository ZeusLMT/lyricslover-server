const database = require('./database');

exports.createSong = (req, res) => {
    if (req.body !== undefined) {
        database.saveSong(req.body, () => {
            res.send('Song OK');
        });
    }
};

exports.getAll = (req, res) => {
    database.getAllSongs((results) => {
        res.json(results);
    })
};

exports.getSongById = (req, res) => {
    if (req.params.id !== undefined) {
        const query = {_id: req.params.id};
        database.getSongByProperties(query, (result) => {
            res.json(result);
        });
    } else {
        res.send("Error getting all songs.");
    }
};

exports.updateSong = (req, res) => {
    if (req.params.id !== undefined) {
        database.updateSong(req.params.id, req.body, (newResult) => {
            res.json(newResult);
        });
    } else {
        res.send("Error updating song.");
    }
};

exports.deleteSong = (req, res) => {
    if (req.params.id !== undefined) {
        database.deleteSongAndReferences(req.params.id, () => {
            res.send("OK");
        });
    } else {
        res.send("Error deleting song.");
    }
};
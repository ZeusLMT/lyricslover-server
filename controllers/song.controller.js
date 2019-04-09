const database = require('./database');

exports.createSong = (req, res) => {
    if (req.body !== undefined) {
        database.saveSong(req.body, () => {
            res.send('Song OK');
        });
    }
};
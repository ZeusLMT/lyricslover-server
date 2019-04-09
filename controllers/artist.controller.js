const database = require('./database');

exports.createArtist = (req, res) => {
    if (req.body !== undefined) {
        database.saveArtist(req.body, () => {
            res.send('OK');
        });
    }
};
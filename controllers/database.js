const Albums = require('../models/album.model');
const Artists = require('../models/artist.model');
const Songs = require('../models/song.model');

exports.saveSong = (newSong, callback) => {
    Songs.create(newSong)
        .then((addedSong) => {
            console.log(`New song added to database.`);
            this.updateArtist(addedSong.artist, { $addToSet: { songs: addedSong.id } }, () => {
                console.log('Update artist with newly added song.');
                callback();
            });
        })
        .catch((error) => {
            console.log(`Save song error: ${error}`);
        });
};

exports.saveArtist = (newArtist, callback) => {
    Artists.create(newArtist)
        .then(() => {
            console.log('New artist added to database.');
            callback();
        })
        .catch((error) => {
            console.log(`Save artist error: ${error}`);
        })
};

exports.updateArtist = (artistId, newObj, callback) => {
    Artists.findOneAndUpdate({'_id': artistId}, newObj, {new: true}, (error, result) =>{
        if (error) throw error;
        callback(result);
    });
}

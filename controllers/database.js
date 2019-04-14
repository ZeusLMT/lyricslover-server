const Albums = require('../models/album.model');
const Artists = require('../models/artist.model');
const Songs = require('../models/song.model');

//SONGS

exports.saveSong = (newSong, callback) => {
    Songs.create(newSong)
        .then((addedSong) => {
            console.log(`New song added to database.`);

            //update artist with newly added song
            this.updateArtist(addedSong.artist, { $addToSet: { songs: addedSong.id } }, () => {
                console.log('Update artist with newly added song.');
                callback();
            });

            // //update album with newly added song
            // this.updateAlbum(addedSong.album, { $addToSet: { tracks: addedSong.id } }, () => {
            //     console.log('update album with newly added song.');
            //     callback();
            // });
        })
        .catch((error) => {
            console.log(`Save song error: ${error}`);
        });
};

exports.updateSong = (songId, newObj, callback) => {
    Songs.findOneAndUpdate({'_id': songId}, newObj, {new: true}, (error, result) =>{
        if (error) throw error;
        callback(result);
    });
};

exports.getAllSongs = (callback) => {
    Songs.find().populate('artist', 'name').populate('album', 'title').then((all) => {
        callback(all);
    });
};





//ARTIST

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
};




//ALBUMS

exports.saveAlbum = (newAlbum, callback) => {
    Albums.create(newAlbum)
        .then((addedAlbum) => {
            console.log('New album added to database.');
            //update artist with newly added song
            this.updateArtist(addedAlbum.artist, { $addToSet: { albums: addedAlbum.id } }, () => {
                console.log('Update artist with newly added album.');
                callback();
            });
        })
        .catch((error) => {
            console.log(`Save album error: ${error}`);
        })
};

exports.updateAlbum = (albumId, newObj, callback) => {
    Albums.findOneAndUpdate({'_id': albumId}, newObj, {new: true}, (error, result) =>{
        if (error) throw error;
        callback(result);
    });
};

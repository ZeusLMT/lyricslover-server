const moment = require('moment/moment');
const Songs = require('../../models/song.model');
const albumDatabase = require('./database.album');
const artistDatabase = require('./database.artist');

exports.saveSong = (newSong, callback) => {
    Songs.create(newSong)
        .then((addedSong) => {
            console.log(`New song added to database.`);
            const promises = [];

            //update artist with newly added song
            promises.push(artistDatabase.updateArtist(addedSong.artist, {$addToSet: {songs: addedSong.id}}, () => {
                console.log('Update artist with newly added song.');
            }));

            if (newSong.album !== undefined) {
                //update album with newly added song
                promises.push(albumDatabase.updateAlbum(addedSong.album, {$addToSet: {tracks: addedSong.id}}, () => {
                    console.log('Update album with newly added song.');
                }));
            }

            Promise.all(promises).then(() => {
                callback(addedSong);
            });
        })
        .catch((error) => {
            console.log(`Save song error: ${error}`);
        });
};

exports.updateSong = (songId, newObj, callback) => {
    const updateSong = {...newObj, updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a")};
    Songs.findOneAndUpdate({'_id': songId}, updateSong, {new: true}, (error, result) =>{
        if (error) throw error;
        callback(result);
    });
};

exports.getAllSongs = (callback) => {
    Songs.find().populate('artist', 'name').populate('album', 'title').then((all) => {
        callback(all);
    });
};

exports.getSongByProperties = (properties, callback) => {
    Songs.findOne(properties).populate('artist', 'name').populate('album', 'title').then((result) => {
        callback(result);
    });
};

exports.deleteSong = (songId, callback) => {
    Songs.findOneAndDelete({_id: songId}, () => {
        callback();
    });
};

exports.deleteSongAndReferences = (songId, callback) => {
    this.getSongByProperties({_id: songId }, (result) => {
        const artist = result.artist;
        const album = result.album;
        const promises = [];

        //update artist with newly added song
        promises.push(artistDatabase.updateArtist(artist.id, {$pull: {songs: songId}}, () => {
            console.log('Delete song ref. from artist.');
        }));

        if (album !== undefined) {
            //update album with newly added song
            promises.push(albumDatabase.updateAlbum(album.id, {$pull: {tracks: songId}}, () => {
                console.log('Delete song ref. from album.');
            }));
        }

        promises.push(this.deleteSong(songId, () => {
            console.log('Song deleted from DB');
        }));

        Promise.all(promises).then(() => {
            callback();
        });
    });
};
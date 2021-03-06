const Albums = require('../../models/album.model');
const songDatabase = require('./database.song');
const artistDatabase = require('./database.artist');

exports.saveAlbum = (newAlbum, callback) => {
    Albums.create(newAlbum)
        .then((addedAlbum) => {
            console.log('New album added to database.');
            //update artist with newly added song
            artistDatabase.updateArtist(addedAlbum.artist, { $addToSet: { albums: addedAlbum.id } }, () => {
                console.log('Update artist with newly added album.');
                callback(addedAlbum);
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

exports.getAllAlbums = (callback) => {
    Albums.find()
        .sort({ title:1 })
        .populate('artist', 'name')
        .populate('tracks', 'title')
        .then((all) => {
        callback(all);
    });
};

exports.getAlbumsByProperties = (properties, callback) => {
    Albums.find(properties)
        .populate('artist', 'name')
        .populate('tracks', 'title')
        .then((results) => {
            callback(results);
        });
};

exports.getArtworkOnly = (albumId, callback) => {
    Albums.findOne({_id: albumId}, {_id: 0, artwork: 1})
        .then((result) => {
            callback(result)
        })
};

exports.deleteAlbum = (albumId, callback) => {
    Albums.findOneAndDelete({_id: albumId}, () => {
        callback();
    });
};

exports.deleteAlbumAndReferences = (albumId, callback) => {
    this.getAlbumsByProperties({_id: albumId}, (results) => {
        const artist = results[0].artist;
        const tracks = results[0].tracks;
        const promises = [];

        //update artist with newly added song
        promises.push(artistDatabase.updateArtist(artist.id, {$pull: {albums: albumId}}, () => {
            console.log('Delete album ref. from artist.');
        }));

        tracks.forEach((track) => {
            songDatabase.updateSong(track._id, {$unset: {album: ""}}, () => {
                console.log("Delete album ref. from song.")
            });
        });

        promises.push(this.deleteAlbum(albumId, () => {
            console.log('Album deleted from DB');
        }));

        Promise.all(promises).then(() => {
            callback();
        });
    });
};
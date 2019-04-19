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
    Albums.find().populate('artist', 'name').populate('tracks', 'title').then((all) => {
        callback(all);
    });
};

exports.getAlbumByProperties = (properties, callback) => {
    Albums.findOne(properties).populate('artist', 'name').populate('tracks', 'title').then((result) => {
        callback(result);
    });
};

exports.deleteAlbum = (albumId, callback) => {
    Albums.findOneAndDelete({_id: albumId}, () => {
        callback();
    });
};

exports.deleteAlbumAndReferences = (albumId, callback) => {
    this.getAlbumByProperties({_id: albumId }, (result) => {
        const artist = result.artist;
        const tracks = result.tracks;
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
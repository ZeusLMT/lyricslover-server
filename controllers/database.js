const moment = require('moment');

const Albums = require('../models/album.model');
const Artists = require('../models/artist.model');
const Songs = require('../models/song.model');

//SONGS

exports.saveSong = (newSong, callback) => {
    Songs.create(newSong)
        .then((addedSong) => {
            console.log(`New song added to database.`);
            const promises = [];

            //update artist with newly added song
            promises.push(this.updateArtist(addedSong.artist, {$addToSet: {songs: addedSong.id}}, () => {
                console.log('Update artist with newly added song.');
            }));

            if (newSong.album !== undefined) {
                //update album with newly added song
                promises.push(this.updateAlbum(addedSong.album, {$addToSet: {tracks: addedSong.id}}, () => {
                    console.log('Update album with newly added song.');
                }));
            }

            Promise.all(promises).then(() => {
                callback();
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
        promises.push(this.updateArtist(artist.id, {$pull: {songs: songId}}, () => {
            console.log('Delete song ref. from artist.');
        }));

        if (album !== undefined) {
            //update album with newly added song
            promises.push(this.updateAlbum(album.id, {$pull: {tracks: songId}}, () => {
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

exports.deleteArtist = (artistId, callback) => {
    Artists.findOneAndDelete({_id: artistId}, () => {
        callback();
    });
};

exports.getAllArtists = (callback) => {
    Artists.find().populate('songs', 'title').populate('albums', 'title').then((all) => {
        callback(all);
    });
};

exports.getArtistByProperties = (properties, callback) => {
    Artists.findOne(properties).populate('songs', 'title').populate('albums', 'title').then((result) => {
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
        promises.push(this.updateArtist(artist.id, {$pull: {albums: albumId}}, () => {
            console.log('Delete album ref. from artist.');
        }));

        tracks.forEach((track) => {
            this.updateSong(track._id, {$unset: {album: ""}}, () => {
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

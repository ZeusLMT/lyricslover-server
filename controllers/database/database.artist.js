const Artists = require('../../models/artist.model');

exports.saveArtist = (newArtist, callback) => {
    Artists.create(newArtist)
        .then((addedArtist) => {
            console.log('New artist added to database.');
            callback(addedArtist);
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

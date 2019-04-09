const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let songSchema = new Schema({
    title: {type: String, required: true, max: 50},
    artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true},
    albums: {type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true},
    lyrics: {type: String, required: true},
    updatedAt: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Song', songSchema);
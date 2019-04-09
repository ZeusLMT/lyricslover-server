const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let songSchema = new Schema({
    title: {type: String, required: true, max: 30},
    artist: {type: ObjectId, ref: 'Artist', required: true},
    // albums: {type: ObjectId, ref: 'Album', required: true},
    albums: {type: ObjectId, ref: 'Album'},
    lyrics: {type: String, required: true},
    updatedAt: {type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('Song', songSchema);
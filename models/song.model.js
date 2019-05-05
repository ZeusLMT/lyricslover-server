const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const moment = require('moment');

let songSchema = new Schema({
    title: {type: String, required: true, max: 30},
    artist: {type: ObjectId, ref: 'Artist', required: true},
    album: {type: ObjectId, ref: 'Album'},
    lyrics: {type: String, required: true},
    updatedAt: {type: String, default: moment().local.format("MMMM Do YYYY, h:mm:ss a")}
});


// Export the model
module.exports = mongoose.model('Song', songSchema);
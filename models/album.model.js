const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let albumSchema = new Schema({
    title: {type: String, required: true, max: 30},
    artist: {type: ObjectId, ref: 'Artist', required: true},
    tracks: [{type: ObjectId, ref: 'Song'}],
    year: Number,
    artwork: String
});


// Export the model
module.exports = mongoose.model('Album', albumSchema);
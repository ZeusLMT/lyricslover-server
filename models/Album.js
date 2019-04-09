const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let albumSchema = new Schema({
    title: {type: String, required: true, max: 30},
    artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true},
    tracks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
    year: Number
});


// Export the model
module.exports = mongoose.model('Album', albumSchema);
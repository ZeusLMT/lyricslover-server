const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let artistSchema = new Schema({
    name: {type: String, required: true, max: 25},
    albums: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
});


// Export the model
module.exports = mongoose.model('Artist', artistSchema);
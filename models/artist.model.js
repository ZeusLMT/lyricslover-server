const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let artistSchema = new Schema({
    name: {type: String, required: true, max: 25},
    albums: [{type: ObjectId, ref: 'Album'}],
    songs: [{type: ObjectId, ref: 'Song'}],
});


// Export the model
module.exports = mongoose.model('Artist', artistSchema);
var mongoose = require('mongoose');
var Playlist = require('./playlist');

var songSchema = new mongoose.Schema({
  songsId: String,
  rank: Number,
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
  }
});

var Song = mongoose.model('Song', songSchema);
module.exports = Song;

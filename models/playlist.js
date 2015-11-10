var mongoose = require('mongoose');
// var User = require('./user');

var playlistSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  }],
});

var Playlist = mongoose.model('Playlist', wakeupSchema);
module.exports = Playlist;

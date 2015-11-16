(function() {
  angular
    .module('tweetBoxApp')
    .factory('Playlist', ['$http', 'Spotify', function($http, Spotify) {
      var Playlist = {};
      Playlist.tracks = [];

      Playlist.new = function() {
        Playlist.tracks.length = 0;
      };

      Playlist.intake = function(songs) {
        console.log(songs);
        for (var i = 0; i < songs.length; i++) {
          Playlist.add(songs[i]);
        }
      };

      Playlist.add = function(song) {
        Spotify.searchAll(song).then(function (data) {
          console.log(data);
          if (data.artists.items[0].name) {
            Playlist.tracks.push(data.artists.items[0].name);
            console.log(data.artists.items[0].name + ' ' + data.tracks.items[0].name);
          }
        });
      };
      return Playlist;
    }]);
})();

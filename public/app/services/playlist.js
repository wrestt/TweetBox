(function() {
  angular
    .module('tweetBoxApp')
    .factory('Playlist', ['$http', function($http) {
      var Playlist = {};
      Playlist.track = [];

      Playlist.intake = function(songs) {
        songs.forEach(Playlist.add(song));
      };

      Playlist.add = function(song) {
        Spotify.searchAll(searchText).then(function (data) {
         Playlist.track.push.apply(Playlist.track, data);
        });
        return Playlist;
      };

      return Playlist;
    }]);
})();

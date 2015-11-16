(function() {
  angular
    .module('tweetBoxApp')
    .factory('Playlist', ['$http', 'Spotify', '$sce',
      function($http, Spotify, $sce) {
      var Playlist = {};
      Playlist.tracksId = [];
      Playlist.trackData = [];
      Playlist.parsedTrack = [$sce.trustAsResourceUrl('https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT')];

      Playlist.new = function() {
        Playlist.tracks.length = 0;
        Playlist.parsedTrack = [$sce.trustAsResourceUrl('https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT')];
      };

      Playlist.intake = function(songs) {
        console.log(songs);
        for (var i = songs.length - 1; i >= 0; i--) {
          Playlist.add(songs[i]);
        }
      };

      Playlist.add = function(song) {
        Spotify.searchAll(song).then(function(data) {
          console.log(data);
          //Add seraching logic
          if (data.tracks.items[0]) {
            Playlist.trackData.push.apply(Playlist.trackData,
              data.tracks.items[0]);
            Playlist.tracksId.push(data.tracks.items[0].id);
            Playlist.parsedTrack[0] = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:" + Playlist.tracksId.join(','));
          }
        });
      };
      return Playlist;
    }]);
})();

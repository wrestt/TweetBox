(function() {
  angular
    .module('tweetBoxApp')
    .factory('Playlist', ['$http', 'Spotify', '$sce',
      function($http, Spotify, $sce) {
      var Playlist = {};
      Playlist.tracks = [];
      Playlist.parsedTrack = [$sce.trustAsResourceUrl('https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT')];

      // $scope.trackID = [$sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:trackset:" + $scope.name)];


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
            Playlist.tracks.push(data.artists.items[0].id);
            // Playlist.parsedTrack[0] = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT,4bi73jCM02fMpkI11Lqmfe');

            Playlist.parsedTrack[0] = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:" + Playlist.tracks.join(','));

            console.log('https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT,4bi73jCM02fMpkI11Lqmfe');
            console.log("https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:" + Playlist.tracks.join(','));
            console.log(data.artists.items[0].name + ' ' + data.tracks.items[0].name);
          }
        });
      };
      return Playlist;
    }]);
})();

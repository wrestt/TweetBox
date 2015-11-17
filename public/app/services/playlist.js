(function() {
  angular
    .module('tweetBoxApp')
    .factory('Playlist', ['$http', 'Spotify', '$sce',
      function($http, Spotify, $sce) {
      var Playlist = {};
      Playlist.trackData = [];

      function Track(data, main) {
        this.id = data[0].id
        this.name = data[0].name;
        this.artists = data[0].artists[0].name;
        this.album = data[0].album.name;
        if (main) {
          this.score = 0;
          this.time = Date.now();
          this.subtracks = [];
          this.subtracks.push(new Track([data[1]], false));
          this.subtracks.push(new Track([data[2]], false));
          this.subtracks.push(new Track([data[3]], false));
          this.subtracks.push(new Track([data[4]], false));
        }
      };

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
          if (data.tracks.items[0]) {
            var temp = _.find(Playlist.trackData, _.matchesProperty('id', data.tracks.items[0].id));
            if (temp) {
              console.log('WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNER');
              console.log('WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNER');
              console.log('WINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNER');
              temp.score ++;
            } else {
              Playlist.trackData.push(new Track(data.tracks.items.slice(0, 5), true));
            }
            Playlist.sort();

            var trackId = [];
            Playlist.trackData.forEach(function(track) {
              console.log(track);
              trackId.push(track.id);
            });

            Playlist.parsedTrack[0] = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:" + trackId.join(','));
          }
        });
      };

      Playlist.check = function(track) {

      };

      Playlist.sort = function() {
        Playlist.trackData.sort(compare);
        console.log(Playlist.trackData);
        function compare(a, b) {
          if (a.score > b.score) {
            return -1;
          } else if (a.score < b.score) {
            return 1;
          }
          if (a.time > b.time) {
            return -1;
          } else {
            return 1;
          }
        }
      };

      return Playlist;
    }]);
})();

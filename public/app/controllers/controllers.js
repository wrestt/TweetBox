(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController',
      ['$scope', 'Spotify', 'Twitter', 'Playlist', 'UserData', '$interval',
        function($scope, Spotify, Twitter, Playlist, UserData, $interval) {
          var vm = this;
          vm.trackID = Playlist.parsedTrack;
          vm.tracks = Playlist.trackData;
          vm.auth = [Twitter.authval];
          Twitter.authCheck();

          vm.newPlaylist = function() {
            Twitter.new();
            Playlist.new();
          };
          vm.searchAll = function(searchText) {
            Spotify.searchAll(searchText).then(function(data) {
              console.log(data);
            });
          };
          vm.twitterfetch = function() {
            Twitter.fetch();
            // $interval(Twitter.fetch, 63000);
          };
          vm.changeSong = function(track, subtrack) {
            Playlist.sub(track, subtrack);
          };

          vm.openauth = function() {
            console.log('opening auth');
            $('#modal1').openModal();
          };

          vm.spotifyAuth = function() {
            UserData.spotifyLogin();
          };
          vm.twitterAuth = function() {
            UserData.twitterLogin();
          };
        }]);
})();

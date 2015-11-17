(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController',
      ['$scope', 'Spotify', 'Twitter', 'Playlist', '$timeout',
        function($scope, Spotify, Twitter, Playlist, $timeout) {
          var vm = this;
          vm.tweets = Twitter.tweets;
          vm.songs = Playlist.tracksId;
          vm.trackID = Playlist.parsedTrack;
          vm.tracks = Playlist.trackData;
          $timeout($scope.tester, 63000);

          vm.tester = function() {
            console.log('hello again');
          };

          vm.searchAll = function(searchText) {
            Spotify.searchAll(searchText).then(function(data) {
              console.log(data);
            });
          };

          vm.twitterfetch = function() {
            Twitter.fetch();
          };

          vm.newPlaylist = function() {
            Twitter.new();
            Playlist.new();
          };

        }]);
})();

(function() {
  angular
    .module('tweetBoxApp')

    .controller('MainController',
      ['$scope', 'Spotify', 'Twitter', 'Playlist', '$interval',
        function($scope, Spotify, Twitter, Playlist, $interval) {
          var vm = this;
          vm.tweets = Twitter.tweets;
          vm.songs = Playlist.tracksId;
          vm.trackID = Playlist.parsedTrack;
          vm.tracks = Playlist.trackData;

          vm.tester = function() {
            console.log('hello again');
          };
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
            $interval(Twitter.fetch, 63000);
          };
        }]);
})();

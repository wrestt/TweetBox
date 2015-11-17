(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController', ['$scope', 'Spotify', 'Twitter', 'Playlist', '$interval',
      function($scope, Spotify, Twitter, Playlist, $interval) {
        $scope.tweets = Twitter.tweets;
        $scope.songs = Playlist.tracksId;
        $scope.trackID = Playlist.parsedTrack;

        $scope.searchAll = function(searchText) {
          Spotify.searchAll(searchText).then(function(data) {
            console.log(data);
          });
        };

        $scope.twitterfetch = function() {
          Twitter.fetch();
          $interval(Twitter.fetch, 63000);
        };

        $scope.newPlaylist = function() {
          Twitter.new();
          Playlist.new();
        };

      }]);
})();

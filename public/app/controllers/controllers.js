(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController', ['$scope', 'Spotify', 'Twitter', 'Playlist', '$timeout',
      function($scope, Spotify, Twitter, Playlist, $timeout) {
        $scope.tweets = Twitter.tweets;
        $scope.songs = Playlist.tracksId;
        $scope.trackID = Playlist.parsedTrack;

        $timeout($scope.tester, 63000);

        $scope.tester = function() {
          console.log('hello again');
        }

        $scope.searchAll = function(searchText) {
          Spotify.searchAll(searchText).then(function(data) {
            console.log(data);
          });
        };

        $scope.twitterfetch = function() {
          Twitter.fetch();
        };

        $scope.newPlaylist = function() {
          Twitter.new();
          Playlist.new();
        };

      }]);
})();

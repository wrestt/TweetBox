(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController', ['$scope', 'Spotify', 'Twitter', 'Playlist',
      function($scope, Spotify, Twitter, Playlist) {
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
        };

        $scope.newPlaylist = function() {
          Twitter.new();
          Playlist.new();
        };

      }]);
})();

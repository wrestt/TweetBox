(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController', ['$scope','$http', 'Spotify', 'Twitter', 'Playlist', '$sce',
      function($scope, $http, Spotify, Twitter, Playlist, $sce) {
        $scope.tweets = Twitter.tweets;
        $scope.songs = Playlist.tracks;
        $scope.trackID = Playlist.parsedTrack;

        $scope.searchAll = function (searchText) {
          Spotify.searchAll(searchText).then(function (data) {
            console.log(data);
          });
        };

        $scope.twitterfetch = function() {
          Twitter.fetch();
        };

        $scope.newPlaylist = function() {
          Twitter.new();
          Playlist.new();
          console.log("new");
          console.log($scope.songs);
          console.log('------------------------------');
          console.log(Playlist.tracks);
        };

      }]);
})();

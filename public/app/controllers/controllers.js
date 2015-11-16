(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController', ['$scope','$http', 'Spotify', 'Twitter', 'Playlist', '$sce',
      function($scope, $http, Spotify, Twitter, Playlist, $sce) {
        $scope.tweets = Twitter.tweets;
        $scope.songs = Playlist.tracks;
        $scope.name = '5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT';
        $scope.trackID = [$sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:" + $scope.name)];

        $scope.searchAll = function (searchText) {
          Spotify.searchAll(searchText).then(function (data) {
            console.log(data);
          });
        };

        $scope.twitterfetch = function() {
          Twitter.fetch();
        };

      }]);
})();

(function() {
  angular
    .module('tweetboxApp', ['$scope', 'Spotify'])
    .config(function(SpotifyProvider) {
      SpotifyProvider.setClientId('123456789123456789');
      SpotifyProvider.setRedirectUri('http://localhost:3000/callback');
      SpotifyProvider.setScope('playlist-read-private');
    })
    .controller('MainController', ['$scope', 'Spotify', '$http',
      function($scope, Spotify, $http) {
        $scope.tweets = [];
        $scope.searchArtist = function() {
          Spotify.search($scope.searchartist, 'artist').then(function(data) {
            $scope.artists = data.artists.items;
          });
        };
        $scope.login = function() {
          Spotify.login().then(function(data) {
            console.log(data);
            alert('You are now logged in');
          });
        };
        $scope.twitterfetch = function() {
          console.log('Click');
          $http({
            method: 'GET',
            url: 'http://localhost:3001/api/twitterfetch'
          }).then(function successCallback(response) {
             console.log(response);
             $scope.tweets.push.apply($scope.tweets, response.data);
          }, function errorCallback(response) {
              console.log("Can't get these tweets man");
          });
        };
        Spotify.getTrack('0eGsygTp906u18L0Oimnem').then(function(data) {
          console.log('=================== Track ===================');
          console.log(data);
        });
      }]);
})();

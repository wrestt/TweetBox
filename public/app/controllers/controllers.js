(function() {
  angular
    .module('tweetBoxApp', [])
    .config(function (SpotifyProvider) {
      SpotifyProvider.setClientId('123456789123456789');
      SpotifyProvider.setRedirectUri('http://example.com/callback.html');
      SpotifyProvider.setScope('playlist-read-private');
    })
    .controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {

      $scope.searchArtist = function() {
        Spotify.search($scope.searchartist, 'artist').then(function (data) {
          $scope.artists = data.artists.items;
        });
      };
      $scope.login = function() {
        Spotify.login().then(function(data) {
          console.log(data);
          alert("You are now logged in");
        })
      };
      
        Spotify.getTrack('0eGsygTp906u18L0Oimnem').then(function (data) {
        console.log('=================== Track ===================');
        console.log(data);
      });

    }]);

})();

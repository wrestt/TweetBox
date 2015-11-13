(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController', ['$scope','$http', 'Spotify',
      function($scope, $http, Spotify) {
        $scope.tweets = [];
        $scope.twitterfetch = function() {
          console.log('clicked');
          $http({
            method: 'GET',
            dataType: 'JSONP',
            url: 'http://127.0.0.1:3000/api/twitterfetch',
            xhrFields: {
              withCredentials: true
            }
          }).then(function successCallback(response) {
            console.log(response);
            $scope.tweets.push.apply($scope.tweets, response.data);
          }, function errorCallback(response) {
            console.log('Cant get these tweets man');
          });
        };

        $scope.searchAll = function () {
          Spotify.searchAll($scope.spotifySearch).then(function (data) {
            console.log(data);
          });
        };

      }]);
})();

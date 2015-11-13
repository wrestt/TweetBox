(function() {
  angular
    .module('tweetBoxApp')
    .controller('MainController', ['$scope','$http', 'Spotify', 'Twitter',
      function($scope, $http, Spotify, Twitter) {
        $scope.tweets = Twitter.tweets;

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

(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData', 'Twitter',
      function($scope, UserData, Twitter) {
        var vm = this;
        vm.tweets = Twitter.tweets;
        vm.formCreateUser = function(obj) {
          UserData.addUser(obj);
        };
        vm.formSigninUser = function(obj) {
          UserData.signInUser(obj);
        };
        vm.spotifyAuth = function() {
          UserData.spotifyLogin();
        };
        vm.twitterAuth = function() {
          UserData.twitterLogin();
        };
        vm.twitterfetch = function() {
          Twitter.fetch();
        };
      }
    ]);
})();

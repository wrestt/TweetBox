(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData', 'Twitter',
      function($scope, UserData, Twitter) {
        var vm = this;
        vm.tweets = Twitter.tweets;
        vm.formCreateUser = function(obj) {
          console.log('UC USER SIGN UP', obj);
          UserData.addUser(obj);
        };
        vm.formSigninUser = function(obj) {
          console.log('UC USER SIGN IN', obj);
          UserData.signInUser(obj);
        };
        vm.twitterfetch = function() {
          Twitter.fetch();
        };
      }
    ]);
})();

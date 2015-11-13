(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData', 'Spotify', 'Twitter',
      function($scope, UserData, Spotify, Twitter) {
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
        vm.spotifyLogin = function() {
          Spotify.login().then(function(data) {
            console.log('**********SPOTIFY USER DATA***************');
            console.log(data);
          });
        };
        vm.twitterfetch = function() {
          Twitter.fetch();
        };
      }
    ]);
})();

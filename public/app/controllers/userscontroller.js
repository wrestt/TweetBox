(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData', 'Spotify',
      function($scope, UserData, Spotify) {
        var vm = this;
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
      }
    ]);
})();

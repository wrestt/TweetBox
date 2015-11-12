(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData',
      function($scope, UserData) {
        var vm = this;
        vm.formCreateUser = function(obj) {
          console.log('UC USER SIGN UP', obj);
          UserData.addUser(obj);
        };
        vm.formSigninUser = function(obj) {
          console.log('UC USER SIGN IN', obj);
          UserData.signInUser(obj);
        };
      }
    ]);
})();

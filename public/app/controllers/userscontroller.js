(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData', '$location',
      function($scope, UserData) {
        $scope.formCreateUser = function(obj) {
          console.log('USER SIGN UP', obj);
          UserData.addUser(obj);
          $location.url('/account');
        };
        $scope.formSigninUser = function(obj) {
          console.log('USER SIGN IN', obj);
          UserData.findUser(obj);
        };
      }
    ]);
})();

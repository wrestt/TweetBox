(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData',
      function($scope, UserData) {
        $scope.user = UserData.UserData;

        $scope.addUser = function(obj) {
          UserData.addUser($scope.newUser);
          $scope.newUser = {};
        };
      }
    ]);
});

(function() {
  angular
    .module('tweetBoxApp')
    .controller('UsersController', ['$scope', 'UserData',
      function($scope, UserData) {
        $scope.formCreateUser = function(obj) {
          console.log(obj);
          UserData.addUser(obj);
          $location.url('/account');
        };
      }
    ]);
})();

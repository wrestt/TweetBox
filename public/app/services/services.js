(function() {
  angular
  .module('tweetBoxApp')
  .factory('UserData', ['$http', '$location', function($http, $location) {
    var UserData = {};

    UserData.userData = [];

    UserData.addUser = function(obj) {
      //Male a post request to USER API
      UserData.userData.push(obj);
      $location.path('/account');
    };

    return UserData;
  }]);
})();

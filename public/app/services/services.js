(function() {
  angular
  .module('tweetBoxApp')
  .factory('UserData', ['$http', function($http) {
    var UserData = {};

    UserData.userData = [];

    UserData.addUser = function(obj) {
      //Male a post request to USER API
      UserData.userData.push(obj);
    };

    return UserData;
  }]);
})();

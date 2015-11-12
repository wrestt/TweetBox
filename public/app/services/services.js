(function() {
  angular
  .module('tweetBoxApp')
  .factory('UserData', ['$http', '$location', '$cookies',
    function($http, $location, $cookies) {
      var UserData = {};
      UserData.user = [];
      console.log('running factory');
      var temp = $cookies.get('user');
      if (temp) {
        UserData.user.push(temp);
        console.log(UserData);
      }
      var favoriteCookie = $cookies.get('myFavorite');

      UserData.addUser = function(obj) {
        $http({
          method: 'POST',
          dataType: 'JSONP',
          url: 'http://127.0.0.1:3000/api/users/signup',
          data: obj
        }).then(function successCallback(response) {
          if (response.data) {
            UserData.user.push(response.data);
            $cookies.put('user', response.data);
            $location.path('/account');
          } else {
            console.log('FAILED TO CREATE USER');
            $location.path('/signup');
          }
        });
      };

      UserData.signInUser = function(obj) {
        $http({
          method: 'POST',
          dataType: 'JSONP',
          url: 'http://127.0.0.1:3000/api/users/login',
          data: obj
        }).then(function successCallback(response) {
          if (response.data) {
            UserData.user.push(response.data);
            $cookies.put('user', response.data);
            $location.path('/account');
          } else {
            //Set alert text to failed login
            console.log('FAILED TO LOGIN USER');
            $location.path('/login');
          }
        });
      }

      UserData.logout = function() {
        UserData.user = [];
        $cookies.delte('user');
      }

      return UserData;
    }]);
})();

(function() {
  angular
  .module('tweetBoxApp')
  .factory('UserData', ['$http', '$location', '$cookies',
    function($http, $location, $cookies) {
      var UserData = {};
      UserData.user = [];
      //Needs to check session data for logined in user
      console.log('&&&&&&&&&&&&&&&&&&&&&COOKIES&&&&&&&&&&&&&&&&&&&&');
  // Setting a cookie
      var temp = $cookies.get('userId');
      if (temp) {
        UserData.user.push(temp);
        console.log(UserData);
      }
      var favoriteCookie = $cookies.get('myFavorite');
      console.log(favoriteCookie);

      UserData.addUser = function(obj) {
        if (UserData.user.length = 0) {
          $http({
            method: 'POST',
            dataType: 'JSONP',
            url: 'http://127.0.0.1:3000/api/users/signup',
            data: obj
          }).then(function successCallback(response) {
            console.log(response);
            if (response.data) {
              UserData.user.push(reponse.data);
              $cookie.put('userId', response.data._id);
              $location.path('/account');
            } else {
              //Set alert text to failed login
              $location.path('/signup');
              console.log('FAILED TO LOOK UP USER');
            }
          });
        } else {
          $location.path('/account');
        }
      };

      return UserData;
    }]);
})();

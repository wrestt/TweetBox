(function() {
  angular
    .module('tweetBoxApp')
    .factory('Twitter', ['$http', function($http) {
      var Twitter = {};
      Twitter.tweets = [];

      Twitter.fetch = function() {
        $http({
          method: 'GET',
          dataType: 'JSONP',
          url: 'http://127.0.0.1:3000/api/twitterfetch',
          xhrFields: {
            withCredentials: true
          }
        }).then(function successCallback(response) {
           console.log(response);
           Twitter.tweets.push.apply(Twitter.tweets, response.data);
           console.log(Twitter.tweets);
        }, function errorCallback(response) {
            console.log("Can't get these tweets man");
        });
      };

      return Twitter;
    }]);
})();

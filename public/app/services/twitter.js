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
          console.log('GOT DATA');
          var last = Twitter.tweets[0];
          var count = response.data.length -1;
          while (count >= 0 && last !== response.data[count]) {
            console.log(last);
            console.log("!==");
            console.log(response.data[count]);
            console.log('ADD');
            Twitter.tweets.push(response.data[count]);
            count--;
          }
        }, function errorCallback(response) {
            console.log("Can't get these tweets man");
        });
      };

      return Twitter;
    }]);
})();

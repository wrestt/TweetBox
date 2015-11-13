(function() {
  angular
    .module('tweetBoxApp')
    .factory('Twitter', ['$http', function($http) {
      var Twitter = {};
      Twitter.tweets = [];
      Twitter.lastId = false;
      Twitter.fetch = function() {
        var data;
        if (Twitter.lastId) {
          data = {since_id: Twitter.lastId.toString()};
        } else {
          data = {count: '200'};
        }
        console.log(data);
        $http({
          method: 'POST',
          dataType: 'JSONP',
          data: data,
          url: 'http://127.0.0.1:3000/api/twitterfetch',
          xhrFields: {
            withCredentials: true
          }
        }).then(function successCallback(response) {
          if (response.data.lastId) {
            Twitter.lastId = response.data.lastId;
          }
          Twitter.tweets.push.apply(Twitter.tweets, response.data.tweets);
        }, function errorCallback(response) {
          console.log('Cant get these tweets man');
        });
      };

      return Twitter;
    }]);
})();

(function() {
  angular
    .module('tweetBoxApp')
    .factory('Twitter', ['$http', 'Playlist', function($http, Playlist) {
      var Twitter = {};
      Twitter.tweets = [];
      Twitter.lastId = false;

      Twitter.new = function() {
        $http({
          method: 'POST',
          dataType: 'JSONP',
          data: {count: '1'},
          url: 'http://127.0.0.1:3000/api/twitterfetch',
          xhrFields: {
            withCredentials: true
          }
        }).then(function successCallback(response) {
          if (response.data.lastId) {
            Twitter.lastId = response.data.lastId;
          }
        }, function errorCallback(response) {
          console.log('Cant get these tweets man');
        });
      }

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
          console.log(response.data);
          if (response.data.lastId) {
            Twitter.lastId = response.data.lastId;
            Twitter.tweets.push.apply(Twitter.tweets, response.data.tweets);
            console.log(response.data.tweets);
            Playlist.intake(response.data.tweets);
          }
        }, function errorCallback(response) {
          console.log('Cant get these tweets man');
        });
      };
      return Twitter;
    }]);
})();

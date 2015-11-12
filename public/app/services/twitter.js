(function() {
  angular
    .module('tweetBoxApp')
    .factory('TwitterAuth', function() {
      TwitterAuth = {};

      var twitter = new twitterAPI({
        consumerKey: 'e0jOhuIEDqPGk4rkKbmBqqg3O',
        consumerSecret: 'ifxEM2BFTkUoggios041EXYDjrOR21y67GeHPzgTLfxqcO5MZy',
        callback: 'http://127.0.0.1:3000'
      });

      TwitterAuth.requestToken = function() {
        twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
          if (error) {
            console.log('Error getting OAuth request token : ' + error);
          } else {
            TwitterAuth.requestToken = requestToken;
            TwitterAuth.requestTokenSecret = requestTokenSecret;
            TwitterAuth.requestTokenUrl = 'https://twitter.com/oauth/authenticate?oauth_token=' + requestToken;
          }
        });
      };

      TwitterAuth.setOauth = function(oauthToken, oauthVerifier) {
        TwitterAuth.oauthToken = oauthToken;
        TwitterAuth.oauthVerifier = oauthVerifier;
        twitter.getAccessToken(TwitterAuth.requestToken, TwitterAuth.requestTokenSecret, TwitterAuth.oauthVerifier, function(error, accessToken, accessTokenSecret, results) {
          if (error) {
            console.log(error);
          } else {
            TwitterAuth.accessToken = accessToken;
            TwitterAuth.accessTokenSecret = accessTokenSecret;
          }
        });
      };

      TwitterAuth.fetchTweets = function(num) {
        if (num === null) {
          num = 5;
        }
        twitter.getTimeline('mentions_timeline', {count: num}, req.session.accessToken, req.session.accessTokenSecret, function(error, data, response) {
          if (error) {
            console.log('Error with fetch');
          } else {
            console.log(data);
          }
        });
      };
      TwitterAuth.requestToken();
      return TwitterAuth;
    });
})();

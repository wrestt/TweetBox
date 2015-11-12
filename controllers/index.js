var loginMiddleware = require('../middleware/loginhelper');
var routeMiddleware = require('../middleware/routehelper');
//
// app.get('/', routeMiddleware.preventLoginSignup, function(req, res) {
//   res.redirect('/users');
// });

// require('./songs');
// require('./playlists');

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
  consumerKey: 'e0jOhuIEDqPGk4rkKbmBqqg3O',
  consumerSecret: 'ifxEM2BFTkUoggios041EXYDjrOR21y67GeHPzgTLfxqcO5MZy',
  callback: 'http://127.0.0.1:3000'
});

app.get('/', function(req,res){
  // Need to figure out a away to save state when bounce back and forth from auth
  if (req.query.oauth_token && req.query.oauth_verifier) {
    req.session.oauth_token = req.query.oauth_token;
    req.session.oauth_verifier = req.query.oauth_verifier;
    console.log('*****************SUCESS*********************');
    res.render('index.html.ejs');
  } else {
    res.render('index.html.ejs');
  }
});

app.get('/twitterauth', function(req, res) {

  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
      console.log("Error getting OAuth request token : " + error);
    } else {
      req.session.requestToken = requestToken;
      req.session.requestTokenSecret = requestTokenSecret;
      userredirect(requestToken);
    }

    function userredirect(requestToken) {
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + requestToken);
    }

  });

});

app.get('api/twitterfetch', function(req, res) {
  if (req.query.oauth_token && req.query.oauth_verifier) {
    twitter.getAccessToken(req.session.requestToken, req.session.requestTokenSecret, req.session.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
      if (error) {
          console.log(error);
      } else {
          req.session.accessToken = accessToken;
          req.session.accessTokenSecret = accessTokenSecret;
          console.log('##################SUCESS###################');
          gettwitterfeed();
      }
    });

    function gettwitterfeed() {
      twitter.getTimeline('mentions_timeline', {count: '5'}, req.session.accessToken, req.session.accessTokenSecret, function(error, data, response) {
        if (error) {
          res.json(error)
        } else {
          var results = [];
          for (var i = 0; i < data.length; i++) {
            results.push(data[i].text);
          }
          res.json(results);
        }
      });
    };
  } else {
    res.redirect('/twitterauth');
  }
});

app.get('*', function(req, res) {
  res.render('index.html.ejs');
});

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('cookie-session');
var db = require('./models');
var apiRouter = express.Router();

app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(session({
  maxAge: 36000000,
  secret: 'hurhurhurhur',
  name: 'TweetBox'
}));

// require('./controllers/index');


var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
  consumerKey: 'e0jOhuIEDqPGk4rkKbmBqqg3O',
  consumerSecret: 'ifxEM2BFTkUoggios041EXYDjrOR21y67GeHPzgTLfxqcO5MZy',
  callback: 'http://127.0.0.1:3000'
});

var shitholder = {};

app.get('/twitterauth', function(req, res) {

  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
      console.log("Error getting OAuth request token : " + error);
    } else {
      req.session.requestToken = requestToken;
      req.session.requestTokenSecret = requestTokenSecret;
      console.log(req.session.requestToken + " " + req.session.requestTokenSecret);
      userredirect(requestToken);
    }

    function userredirect(requestToken) {
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + requestToken);
    }

  });

});

apiRouter.route('/twitterfetch')
  .get(function(req, res) {
    console.log('***********Hello World*************');
    console.log(app.request);
    console.log('***********Hello World*************');
    console.log(req);
    console.log(req.session.requestToken + " " + req.session.requestTokenSecret + " " + req.session.oauth_verifier);
    twitter.getAccessToken(req.session.requestToken, req.session.requestTokenSecret, req.session.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
    if (error) {
        console.log(error);
        console.log('&&&&&&&&&&&&&&&&OSHIT&&&&&&&&&&&&&&&');
    } else {
      req.session.accessToken = accessToken;
      req.session.accessTokenSecret = accessTokenSecret;
      console.log('##################SUCESS###################');
      gettwitterfeed();
    }
});
    // twitter.getAccessToken(req.session.requestToken, req.session.requestTokenSecret, req.session.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
    //   if (error) {
    //       console.log(error);
    //       console.log('&&&&&&&&&&&&&&&&OSHIT&&&&&&&&&&&&&&&');
    //   } else {
    //       req.session.accessToken = accessToken;
    //       req.session.accessTokenSecret = accessTokenSecret;
    //       console.log('##################SUCESS###################');
    //       gettwitterfeed();
    //   }
    // });

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
});

app.use('/api', apiRouter);

app.get('/', function(req,res){
  console.log(req.session);
  // Need to figure out a away to save state when bounce back and forth from auth
  if (req.query.oauth_token && req.query.oauth_verifier) {
    req.session.oauth_token = req.query.oauth_token;
    req.session.oauth_verifier = req.query.oauth_verifier;
    console.log(req.session.oauth_token);
    console.log(req.session.oauth_verifier);
    console.log('*****************SUCESS*********************');
    console.log(req.session.requestToken + " " + req.session.requestTokenSecret);
    res.render('index.html.ejs');
  } else {
    res.render('index.html.ejs');
  }
});

app.get('*', function(req, res) {
  res.render('index.html.ejs');
});

app.listen(3000, function() {
  console.log('Server up @ ' +  3000);
});

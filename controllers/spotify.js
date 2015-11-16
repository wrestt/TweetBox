var twitterAPI = require('node-twitter-api');
var myClientId = '634a5dc250544991b91a8be0874b61be';
var mySecret = 'f2eed101cdb144349ff7f6589b4096ef';
var redirectUri = 'http://127.0.0.1:3000/spotifycallback';
var scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-follow-read user-library-read user-library-modify user-read-private user-read-birthdate';

app.get('/spotifyauth', function(req, res) {
  console.log('made it happen');
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + myClientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri));
});

app.get('/spotifycallback', function(req, res) {
  req.session.spotifyToken = req.query.code;
  console.log(req.session.spotifyToken);
  res.redirect('/#/close');
});

app.use('/api', apiRouter);

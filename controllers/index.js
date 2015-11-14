require('./twitter');
require('./spotify');
require('./users');

// require('./songs');
// require('./playlists');

app.get('/', function(req,res ){
  console.log(req.session);
  // Need to figure out a away to save state when bounce back and forth from auth
  if (req.query.oauth_token && req.query.oauth_verifier) {
    req.session.oauth_token = req.query.oauth_token;
    req.session.oauth_verifier = req.query.oauth_verifier;
    console.log(req.session.oauth_token);
    console.log(req.session.oauth_verifier);
    console.log('*****************SUCESS*********************');
    res.redirect('/api/twittertoken');
  } else {
    res.render('index.html.ejs');
  }
});

app.get('*', function(req, res) {
  console.log('***********************************************************');
  res.render('index.html.ejs');
});

var loginMiddleware = require('../middleware/loginhelper');
var routeMiddleware = require('../middleware/routehelper');
//
// app.get('/', routeMiddleware.preventLoginSignup, function(req, res) {
//   res.redirect('/users');
// });

// require('./songs');
// require('./playlists');

app.get('/', function(req,res){
  res.render('index.ejs');
});

app.get('*', function(req, res) {
  res.render('404');
});

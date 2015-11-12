var db = require('../models/index');

apiRouter.route('/users/signup')
.post(function(req, res) {
  var newUser = req.body;
  db.User.create(newUser, function(err, user) {
    console.log('user:  ' + user);
    if (user) {
      console.log(user);
      res.json(user);
    } else {
      console.log('Create User: ERROR');
      res.json({message: 'User created!'});
    }
  });
});

apiRouter.route('/users/login')
.post(function(req, res) {
  db.User.authenticate(req.body, function(err, user) {
    if (!err && user !== null) {
      res.json(user);
    } else {
      res.json({message: 'Login Failed!'});
    }
  });
});

apiRouter.route('/users/edit')
.get(function(req, res) {
  db.User.findById(req.session.id, function(err, user) {
    res.json(user);
  });
});

apiRouter.route('/users')
.put(function(req, res) {
  db.User.findByIdAndUpdate(req.session.id, req.body.user, function(err, user) {
    if (err) {
      res.redirect('/users/edit');
    } else {
      res.redirect('/users');
    }
  });
});

apiRouter.route('/users/logout')
.get(function(req, res) {
  res.json('/users');
});

app.use('/api', apiRouter);

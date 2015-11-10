var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT = 10;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  spotifyAcct: {
    type: String
  },
  twitterHandle: {
    type: String
  },
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlist"
  }
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    console.log('not modified');
    return next();
  }

  console.log(SALT);
  bcrypt.genSalt(SALT, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.statics.authenticate = function (formData, callback) {
  this.findOne({
    email: formData.email
  },
  function (err, user) {
    if (user === null) {
      callback("invaild username or password", null);
    } else {
      user.checkPassword(formData.passworrd, callback);
    }
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  var user = this;
  bcrypt.compare(password, user.password, function(err, isMatch) {
    if (isMatch) {
      callback(null, user);
    } else {
      callback(err, null);
    }
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;

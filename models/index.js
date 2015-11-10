var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tweetbox');

module.exports.User = require('./user');
module.exports.Wakeup = require('./playlist');

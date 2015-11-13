(function() {
  angular
    .module('tweetBoxApp')
    .controller('SpotifyCallBackController',
      function() {
        console.log('RunningController');
        window.onload=function() {
          console.log('CBP made it in script');
          var target = window.self === window.top ? window.opener : window.parent;
          var hash = window.location.hash;
          if (hash) {
            var token = window.location.hash.split('&')[0].split('=')[1];
            localStorage.setItem('spotify-token', token);
          };
        };
      }
    );
})();

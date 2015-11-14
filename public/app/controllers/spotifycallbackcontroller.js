(function() {
  angular
    .module('tweetBoxApp')
    .controller('SpotifyCallBackController',
      function($scope) {
        console.log('RunningController');
        $scope.getinfo = function() {
          console.log('CBP made it in script');
          var target = (window.self === window.top ? window.opener : window.parent);
          var hash = window.location.hash;
          if (hash) {
            console.log(hash);
            var token = window.location.hash.split('=')[1].split('#')[0];
            console.log(token);
            localStorage.setItem('spotify-token', token);
          };
        };
      }
    );
})();

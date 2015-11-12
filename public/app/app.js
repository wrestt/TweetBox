(function() {
  angular
    .module('tweetBoxApp', ['ngRoute', 'spotify'])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: './app/partials/index.html',
          controller: 'MainController'
        })
        .when('/callback', {
          templateUrl: './app/partials/callback.html',
          controller: 'MainController'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .config(function(SpotifyProvider) {
      SpotifyProvider.setClientId('123456789123456789');
      SpotifyProvider.setRedirectUri('http://localhost:3000/callback');
      SpotifyProvider.setScope('playlist-read-private');
    });
})();

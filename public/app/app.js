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
      SpotifyProvider.setClientId('634a5dc250544991b91a8be0874b61be');
      SpotifyProvider.setClientSecret('f2eed101cdb144349ff7f6589b4096ef');
      SpotifyProvider.setRedirectUri('http://127.0.0.1:3000/spotify/callback/');
      SpotifyProvider.setScope('playlist-read-private');
    });
})();
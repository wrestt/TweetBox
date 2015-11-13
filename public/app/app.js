(function() {
  angular
    .module('tweetBoxApp', ['ngRoute', 'spotify', 'ngCookies', 'ngResource'])
    .config(['$resourceProvider', '$routeProvider', '$locationProvider',
      function($resourceProvider, $routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
        // $resourceProvider.defaults.stripTrailingSlashes = false;
        $routeProvider
          .when('/', {
            templateUrl: '/app/partials/home.html',
            controller: 'MainController',
            controllerAs: 'vm'
          })
          .when('/signin', {
            templateUrl: '/app/partials/signin.html',
            controller: 'UsersController',
            controllerAs: 'vm'
          })
          .when('/signup', {
            templateUrl: '/app/partials/signup.html',
            controller: 'UsersController',
            controllerAs: 'vm'
          })
          .when('/account', {
            templateUrl: '/app/partials/account.html',
            controller: 'UsersController',
            controllerAs: 'vm'
          })
          .when('/spotify/callback/', {
            templateUrl: '/app/partials/callback.html',
            controller: 'SpotifyCallBackController',
            controllerAs: 'vm'
          })
          .otherwise({
            redirectTo: '/'
          });
      }])
      .config(function(SpotifyProvider) {
        SpotifyProvider.setClientId('634a5dc250544991b91a8be0874b61be');
        SpotifyProvider.setRedirectUri(
          'http://127.0.0.1:3000/spotify/callback/'
        );
        SpotifyProvider.setScope('playlist-read-private');
      });
})();

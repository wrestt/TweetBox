(function() {
  angular
    .module('tweetboxApp', ['ngRoute'])
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
    });
})();

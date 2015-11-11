(function() {
  angular
    .module('tweetBoxApp', [])
    .controller('myController', function($scope) {
      $scope.greeting = 'Hello World!';
    }
  );
})();

(function() {
  angular
    .module('tweetBoxApp')
    .controller('CallBackController', ['$scope', '$window', '$cookies',
      function($scope, $window, $cookies) {
        $scope.close = function() {
          // $window.close()
          console.log('****************************ksjdgfjksdkjhgfkjgsdfjkgsdfkjgh');
          var value = $cookies.get();
          console.log(value);
        };
      }
    ]);
})();

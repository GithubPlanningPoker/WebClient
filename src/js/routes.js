(function() {
  angular.module('ghpp')

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/start', {
          templateUrl: 'partials/start-layout.htm',
          controller: 'StartCtrl'
        })
        .when('/join/:gameId', {
          templateUrl: 'partials/join-layout.htm',
          controller: 'JoinCtrl'
        })
        .when('/game/:gameId', {
          templateUrl: 'partials/game-layout.htm',
          controller: 'GameCtrl'
          })
        .otherwise({
          templateUrl: 'partials/start-layout.htm',
          controller: 'StartCtrl'
        });
    }]);

})();
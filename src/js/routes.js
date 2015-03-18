(function() {
  angular.module('ghpp')

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode({ enabled: true });
      $locationProvider.hashPrefix('!');
      $routeProvider
        .when('/start', {
          templateUrl: 'partials/start.partial.htm',
          controller: 'StartCtrl'
        })
        .when('/join/:gameId', {
          templateUrl: 'partials/join.partial.htm',
          controller: 'JoinCtrl'
        })
        .when('/game/:gameId', {
          templateUrl: 'partials/game.partial.htm',
          controller: 'GameCtrl'
          })
        .otherwise({
          templateUrl: 'partials/start.partial.htm',
          controller: 'StartCtrl'
        });
    }]);

})();
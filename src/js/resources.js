(function() {
  angular.module('ghpp')

    .factory('Games', ['$resource', function ($resource) {
      return $resource('../../ghpp/game/:gameId');
    }])

    .factory('Users', ['$resource', function ($resource) {
      return $resource('../../ghpp/game/:gameId/user/:user', null, {
        query: { method: 'GET' },
        update: { method: 'PUT' }
      });
    }])

    .factory('GameTitle', ['$resource', function ($resource) {
      return $resource('../../ghpp/game/:gameId/title', null, {
        query: { method: 'GET' },
        update: { method: 'PUT' }
      });
    }])

    .factory('GameDescription', ['$resource', function ($resource) {
      return $resource('../../ghpp/game/:gameId/description', null, {
        query: { method: 'GET' },
        update: { method: 'PUT' }
      });
    }]);
    
})();
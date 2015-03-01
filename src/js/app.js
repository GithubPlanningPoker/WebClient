(function() {
	angular.module('ghpp', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'ghpp-start', 'ghpp-game', 'ghpp-join'])

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
		}])

		.factory('Games', ['$resource', function ($resource) {
			return $resource('../../ghpp/game/:gameId');
		}])

		.factory('Users', ['$resource', function ($resource) {
			return $resource('../../ghpp/game/:gameId/user/:user', null, {
				query: { method: 'GET', isArray: false },
				update: { method: 'PUT' }
			});
		}])

		.factory('GameTitle', ['$resource', function ($resource) {
			return $resource('../../ghpp/game/:gameId/title', null, {
				query: { method: 'GET', isArray: false },
				update: { method: 'PUT' }
			});
		}])

		.factory('GameDescription', ['$resource', function ($resource) {
			return $resource('../../ghpp/game/:gameId/description', null, {
				query: { method: 'GET', isArray: false },
				update: { method: 'PUT' }
			});
		}])

		.controller('AlertCtrl', ['$rootScope', function ($rootScope) {
			$rootScope.alerts = [];

			$rootScope.addAlert = function (message, alertType) {
    		$rootScope.alerts.push({type: alertType, msg: message});
  		};
			$rootScope.closeAlert = function (index) {
	    	$rootScope.alerts.splice(index, 1);
	  	};
		}])

		.directive('ngEnter', function () {
    	return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngEnter);
              });

              event.preventDefault();
          }
        });
    	};
		})

		.directive('ngEscape', function () {
    	return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          if(event.which === 27) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngEscape);
              });

              event.preventDefault();
          }
        });
    	};
		})

		.directive('showFocus', function($timeout) {
		  return function(scope, element, attrs) {
		    scope.$watch(attrs.showFocus, 
		      function (newValue) { 
		        $timeout(function() {
		            if (newValue)
		            	element[0].focus();
		        });
		      }, true);
		  };    
		})

		.directive('enterSubmit', function () {
	    return {
	      restrict: 'A',
	      link: function (scope, elem, attrs) {
	       
	        elem.bind('keydown', function(event) {
	          var code = event.keyCode || event.which;
	                  
	          if (code === 13) {
	            if (!event.shiftKey) {
	              event.preventDefault();
	              scope.$apply(attrs.enterSubmit);
	            }
	          }
	        });
	      }
	    };
  	});

})();

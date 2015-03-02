(function() {
	angular.module('ghpp', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize', 'ui.bootstrap'])

		.controller('AlertCtrl', ['$rootScope', function ($rootScope) {
			$rootScope.alerts = [];

			$rootScope.addAlert = function (message, alertType) {
    		$rootScope.alerts.push({type: alertType, msg: message});
  		};
			$rootScope.closeAlert = function (index) {
	    	$rootScope.alerts.splice(index, 1);
	  	};
		}]);

})();

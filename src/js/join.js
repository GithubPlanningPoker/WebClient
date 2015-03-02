(function() {
	angular.module('ghpp')

	.controller('JoinCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'Games', 'Users', function ($scope, $rootScope, $location, $cookies, Games, Users){
		$scope.gameId = $location.url().split('/')[2];
		$scope.joinName = $cookies.username || '';
		$cookies.gameId = $scope.gameId;

		$scope.joinGame = function (username) {
			var user = new Users({gameId: $scope.gameId});
			user.username = username;
			user.$save(user, function (response) {
				$cookies.userId = response.userId;
				$cookies.username = username;
				$location.url('/game/' + $scope.gameId);
			}, function (response) {
				$rootScope.addAlert('Game with id: ' + $scope.gameId + ' not found!', 'danger');
			});
		};
	}]);
})();

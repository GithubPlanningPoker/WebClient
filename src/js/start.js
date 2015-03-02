(function() {
	angular.module('ghpp')

	.controller('StartCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'Games', 'Users', function ($scope, $rootScope, $location, $cookies, Games, Users){

		$scope.newName = $cookies.username || '';
		$scope.joinName = $cookies.username || '';

		$scope.createGame = function (username) {
			var game = new Games({username: username});
			$cookies.username = username;

			game.$save(game, function (response) {
				$cookies.gameId = response.gameId;
				$cookies.userId = response.userId;
				$location.url('/game/' + response.gameId);
			});
		};

		$scope.joinGame = function (username) {
			var user = new Users({gameId: $scope.joinGameId});
			user.username = username;
			user.$save(user, function (response) {
				$cookies.userId = response.userId;
				$cookies.username = username;
				$location.url('/game/' + $scope.joinGameId);
			}, function(response) {
				$rootScope.addAlert('Game with id: ' + $scope.joinGameId + ' not found!', 'danger');
			});
		};

	}]);
})();

(function() {
	angular.module('ghpp')

	.controller('GameCtrl', ['$scope', '$rootScope', '$location', '$interval', '$cookies', '$modal', 'Games', 'Users', function ($scope, $rootScope, $location, $interval, $cookies, $modal, Games, Users){
		var gameId = $location.url().split('/')[2] || null;

		if (gameId != $cookies.gameId)
			$location.url('/join/' + gameId);

		Games.get({gameId: gameId}, function (data) {
			$scope.hostName = data.username;
		}, function (response) {
			$rootScope.addAlert('Game with id: ' + gameId + ' not found!', 'danger');
		});
		Users.get({gameId: gameId}, function (data) {
			$scope.users = data.users;
		});

		$scope.interval = $interval(function () {
			Users.get({gameId: gameId}, function (data) {
				$scope.users = data.users;
			});
		}, 1000);

		$scope.$on('$destroy', function() {
			if ($scope.interval)
				$interval.cancel($scope.interval);
		});

		$scope.username = $cookies.username;
		$scope.userId = $cookies.userId;
		$scope.gameId = $cookies.gameId;

		var items = [
			{text: '0', value: '0'},
			{text: '&frac12;', value: 'half'},
			{text: '1', value: '1'},
			{text: '2', value: '2'},
			{text: '3', value: '3'},
			{text: '5', value: '5'},
			{text: '8', value: '8'},
			{text: '13', value: '13'},
			{text: '20', value: '20'},
			{text: '40', value: '40'},
			{text: '100', value: '100'},
			{text: '?', value: '?'},
			{text: '&infin;', value: 'inf'},
			{text: '<span class="glyphicon glyphicon-time"></span>', value: 'break'}
		];

	  $scope.castVote = function () {
	    var modalInstance = $modal.open({
	      templateUrl: 'partials/vote-modal.htm',
	      controller: 'GameVoteCtrl',
	      size: 'lg',
	      resolve: {
	      	items: function () {
	      		return items;
	      	}
	      }
	    });
	    modalInstance.result.then(function (selectedItem) {
	  		Users.update({gameId: $scope.gameId, user: $scope.username}, {vote: selectedItem.value, userId: $scope.userId});
	  	}, function () {
	  		//cancelled modal
	  	});
	  };

	  $scope.clearVotes = function () {
	  	Users.update({gameId: $scope.gameId}, {userId: $scope.userId});
	  };
	}])

	.controller('GameVoteCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
		$scope.cards = items;
		$scope.selected = { card: $scope.cards[0] };

	  $scope.ok = function () {
	    $modalInstance.close($scope.selected.card);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	}])

	.controller('GameDescriptionCtrl', ['$scope', '$interval', 'Games', 'GameTitle', 'GameDescription', function ($scope, $interval, Games, GameTitle, GameDescription) {
		$scope.titleEdit = false;
		$scope.descrEdit = false;
		GameTitle.get({gameId: $scope.$parent.gameId}, function (data) {
			$scope.gameTitle = data.title;
		});
		GameDescription.get({gameId: $scope.$parent.gameId}, function (data) {
			$scope.gameDescr = data.description;
		});

		$scope.interval = $interval(function () {
			if (!$scope.titleEdit)
				GameTitle.get({gameId: $scope.$parent.gameId}, function (data) {
					$scope.gameTitle = data.title;
				});
			if (!$scope.descrEdit)
				GameDescription.get({gameId: $scope.$parent.gameId}, function (data) {
					$scope.gameDescr = data.description;
				});
		}, 1000);

		$scope.$on('$destroy', function() {
			if ($scope.interval)
				$interval.cancel($scope.interval);
		});

		$scope.submitTitle = function (gameTitle) {
			GameTitle.update({gameId: $scope.$parent.gameId}, {title: gameTitle});
			$scope.titleEdit = false;
		};

		$scope.submitDescr = function (gameDescr) {
			GameDescription.update({gameId: $scope.$parent.gameId}, {description: gameDescr});
			$scope.descrEdit = false;
		};

		$scope.clearDescr = function () {
			GameTitle.update({gameId: $scope.$parent.gameId}, {title: ''});
			GameDescription.update({gameId: $scope.$parent.gameId}, {description: ''});
		};
	}])

	.filter('pokercard', function() {
		return function(input) {
			switch (input) {
				case 'half':
					return '&frac12';
				case 'question':
					return '?';
				case 'infinite':
					return '&infin;';
				case 'break':
					return '<span class="glyphicon glyphicon-time"></span>';
				default:
					return input;
			}
		};
	});

})();

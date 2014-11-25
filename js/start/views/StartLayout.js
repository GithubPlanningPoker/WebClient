App.module("Start.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.StartLayout = Backbone.Marionette.LayoutView.extend({
		template: "#start-layout",

		ui: {
			newGameForm: "#new-game-form",
			joinGameForm: "#join-game-form",
			newGameUsername: "#new-game-username",
			joinGameGameId: "#join-game-gameid",
			joinGameUsername: "#join-game-username"
		},

		events: {
			"submit @ui.newGameForm": "newGame",
			"submit @ui.joinGameForm": "joinGame"
		},

		onShow: function() {
			var username = App.Shared.Models.Settings.instance.get("username");
			if (username !== undefined && username !== null && username !== "") {
				this.ui.newGameUsername.val(username);
				this.ui.joinGameUsername.val(username);
			}
		},

		newGame: function(e) {
			e.preventDefault();
			var username = this.ui.newGameUsername.val();
			App.Start.Controller.newGame(username);
		},

		joinGame: function(e) {
			e.preventDefault();
			var gameId = this.ui.joinGameGameId.val();
			var username = this.ui.joinGameUsername.val();
			App.Start.Controller.joinGame(gameId, username);
		}
	});
});
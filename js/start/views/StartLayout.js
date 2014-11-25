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
			this.ui.newGameUsername.val(username);
			this.ui.joinGameUsername.val(username);
		},

		newGame: function(e) {
			e.preventDefault();
		},

		joinGame: function(e) {
			e.preventDefault();
		}
	});
});
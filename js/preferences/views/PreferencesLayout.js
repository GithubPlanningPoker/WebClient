App.module("Preferences.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.PreferencesLayout = Backbone.Marionette.LayoutView.extend({
		template: "#preferences-layout",

		onShow: function() {
			var APIHost = this.model.get("host");
			var username = this.model.get("username");

			if (APIHost !== undefined && APIHost !== null && APIHost !== "")
				this.ui.gameAPIHost.val(APIHost);

			if (APIHost !== undefined && APIHost !== null && APIHost !== "")
				this.ui.gameUsername.val(username);
		},

		ui: {
			gameForm: "#game-form",
			gameAPIHost: "#game-apihost",
			gameUsername: "#game-username"
		},

		events: {
			"submit @ui.gameForm": "savePreferences"
		},

		savePreferences: function(e) {
			e.preventDefault();

			var APIHost = this.ui.gameAPIHost.val();
			var username = this.ui.gameUsername.val();

			App.Preferences.Controller.savePreferences(APIHost, username);
		}

	});
});
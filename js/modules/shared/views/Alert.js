App.module("Shared.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.Alert = Backbone.Marionette.ItemView.extend({
		template: "#alert-view",
		message: "No message.",
		alertClass: "alert-warning",

		ui: {
			alertMain: "div.alert"
		},

		initialize: function(options) {
			var self = this;
			var options = options || {};

			if (options.message)
				this.message = options.message;

			if (options.alertClass && validAlertClass(options.alertClass))
				this.alertClass = options.alertClass;

			App.on("alert:dismiss", function(args) { self.destroy(); });
		},

		serializeData: function() {
			return { message: this.message, alertClass: this.alertClass };
		}
	});

	var validAlertClass = function(name) {
		var classes = ["alert-success", "alert-info", "alert-warning", "alert-danger"];
		return classes.indexOf(name) > -1;
	};
});
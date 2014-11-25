App.module("Preferences.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.PreferencesLayout = Backbone.Marionette.LayoutView.extend({
		template: "#preferences-layout",
	});
});
App.module("Game.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.JoinLayout = Backbone.Marionette.LayoutView.extend({
		template: "#join-layout",
	});
});
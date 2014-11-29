App.module("Game.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.Player = Backbone.Marionette.ItemView.extend({
		template: "#player-view"
	});
});
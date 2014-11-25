App.module("Game.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.GameLayout = Backbone.Marionette.LayoutView.extend({
		template: "#game-layout",
	});
});
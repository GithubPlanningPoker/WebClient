App.module("Game.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.GameLayout = Backbone.Marionette.LayoutView.extend({
		template: "#game-layout",

		ui: {
			title: "#title"
		},

		initialize: function() {
			var self = this;
			this.title = new App.Game.Models.Title();
			this.title.on("change:title", function(model, change) { self.updateTitle(change) });
      this.interval = setInterval(function() { self.title.fetch() }, 500);
		},

		updateTitle: function(title) {
			this.ui.title.html(title);
		}
	});
});
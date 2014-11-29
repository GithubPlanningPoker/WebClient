App.module("Game.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.GameLayout = Backbone.Marionette.LayoutView.extend({
		template: "#game-layout",
		titleModel: null,
		titleInterval: null,
		descriptionModel: null,
		descriptionInterval: null,

		ui: {
			title: "#title",
			description: "#description"
		},

		initialize: function() {
			var self = this;

			this.titleModel = new App.Game.Models.Title();
			this.titleModel.on("change:title", function(model, change) { self.updateTitle(change) });
      this.titleInterval = setInterval(function() { self.titleModel.fetch() }, 500);

      this.descriptionModel = new App.Game.Models.Description();
      this.descriptionModel.on("change:description", function(model, change) { self.updateDescription(change)});
      this.descriptionInterval = setInterval(function() { self.descriptionModel.fetch() }, 500);
		},

		updateTitle: function(title) {
			this.ui.title.html(title);
		},

		updateDescription: function(description) {
			this.ui.description.html(description);
		}
	});
});
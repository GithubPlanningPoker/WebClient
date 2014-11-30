App.module("Game.Views", function(Views, App, Backbone, Marionette, $, _) {
	Views.GameLayout = Backbone.Marionette.LayoutView.extend({
		template: "#game-layout",
		titleModel: null,
		titleInterval: null,
		descriptionModel: null,
		descriptionInterval: null,
		playerCollection: null,
		playerInterval: null,

		regions: {
			playerRegion: "#player-region"
		},

		ui: {
			title: "#title",
			description: "#description"
		},

		initialize: function() {
			var self = this;

			this.titleModel = new App.Game.Models.Title();
			this.titleModel.on("change:title", function(model, change) { self.updateTitle(change) });

      this.descriptionModel = new App.Game.Models.Description();
      this.descriptionModel.on("change:description", function(model, change) { self.updateDescription(change)});

      this.playerCollection = new App.Game.Models.PlayerCollection();
      this.colView = new Backbone.Marionette.CollectionView({ childView: Views.Player, collection: this.playerCollection });
      this.playerCollection.on("add", function(model, collection, xhr) { self.updatePlayers()});
      this.playerCollection.on("remove", function(model, collection, xhr) { self.updatePlayers()});
      this.playerCollection.on("change", function(model, collection, xhr) { self.updatePlayers()});
		},

		onShow: function() {
			var self = this;

			self.titleModel.fetch()
      this.titleInterval = setInterval(function() { self.titleModel.fetch() }, 500);

      self.descriptionModel.fetch()
      this.descriptionInterval = setInterval(function() { self.descriptionModel.fetch() }, 500);

      self.playerCollection.fetch();
      this.playerInterval = setInterval(function() { self.playerCollection.fetch() }, 500);
		},

		onDestroy: function() {
			clearInterval(this.titleInterval);
			clearInterval(this.descriptionInterval);
			clearInterval(this.playerInterval);
		},

		updateTitle: function(title) {
			this.ui.title.html(title);
		},

		updateDescription: function(description) {
			this.ui.description.html(description);
		},

		updatePlayers: function() {
			this.playerRegion.show(this.colView);
		}
	});
});
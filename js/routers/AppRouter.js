var ghpp = ghpp || {};
ghpp.routers = ghpp.routers || {};

ghpp.routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		var self = this;
		self.container = options.container;
	},
	routes: {
		'': 'start',
		'start': 'start',
		'game/:gameId': 'game',
		'*default': 'default'
	},
	start: function() {
		this.container.show(new ghpp.views.StartLayout());
	},
	game: function(gameId) {
		this.container.show(new ghpp.views.GameLayout());
	},
	default: function() {
		this.container.reset();
	}
});
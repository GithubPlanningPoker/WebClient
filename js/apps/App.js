var ghpp = ghpp || {};
ghpp.apps = ghpp.apps || {};

ghpp.apps.App = Backbone.Marionette.Application.extend({
	initialize: function(options) {
		var self = this;
		self.container = new Backbone.Marionette.Region({
			el: options.container
		})
	}
});
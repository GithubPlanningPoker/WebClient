var App = new Backbone.Marionette.Application();
App.addRegions({ container: "#container" });
App.on("start", function (options) {
	if (Backbone.history) {
  	Backbone.history.start();
	}
});
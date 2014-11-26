var App = new Backbone.Marionette.Application();
App.addRegions({ container: "#container", alert: "#alert" });
App.on("start", function (options) {
	if (Backbone.history) {
  	Backbone.history.start();
	}
});
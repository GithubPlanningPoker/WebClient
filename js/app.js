$(function() {
	var app = new ghpp.apps.App({container: '#container'});
	app.addInitializer(function(options) {
		var appRouter = new ghpp.routers.AppRouter({ container: app.container });
		Backbone.history.start();
	});
	app.start();
});
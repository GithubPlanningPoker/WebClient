$(function () {
  var app = new Backbone.Marionette.Application();
  app.addRegions({ container: "#container" });
  app.addInitializer(function (options) {
    new ghpp.routers.AppRouter({ container: app.container });
  });
  app.on("start", function (options) {
    Backbone.history.start();
  });
  app.start();
});
App.module("Start", function(Start, App, Backbone, Marionette, $, _){

  Start.Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "": "showStart",
      "start": "showStart"
    }
  });

  var API = {
    showStart: function() {
      App.container.show(new App.StartLayout());
    }
  }

  App.on("start:show", function() {
    API.showStart();
  });

  App.addInitializer(function() {
    new Start.Router({
      controller: API
    })
  });
});
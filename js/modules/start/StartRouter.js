App.module("Start", function(Start, App, Backbone, Marionette, $, _) {

  Start.Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "": "showStart",
      "start": "showStart"
    }
  });

  App.on("start:show", function() {
    App.trigger("alert:dismiss");
    Backbone.history.navigate("start", {trigger: true});
  });

  App.addInitializer(function() {
    new Start.Router({
      controller: new Start.Controller()
    })
  });
});
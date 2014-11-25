App.module("Preferences", function(Preferences, App, Backbone, Marionette, $, _) {

  Preferences.Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "preferences": "showPreferences",
    }
  });

  var API = {
    showPreferences: function() {
      App.Preferences.Controller.show();
    }
  }

  App.on("preferences:show", function() {
    Backbone.history.navigate("preferences", {trigger: true});
  });

  App.addInitializer(function() {
    new Preferences.Router({
      controller: API
    })
  });
});
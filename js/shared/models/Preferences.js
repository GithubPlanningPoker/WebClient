App.module("Shared.Models", function(Models, App, Backbone, Marionette, $, _){
  Models.Preferences = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("ghpp-preferences"),

    defaults: {
      id: 1, //Is needed for fetch/save to work
      host: "",
      username: ""
    }
  });

  App.addInitializer(function() {
    var settings = new Models.Preferences();
    settings.fetch();
    App.Shared.Models.Preferences.instance = settings;
  });
});
App.module("Shared.Models", function(Models, App, Backbone, Marionette, $, _){
  Models.Settings = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("settings"),
    defaults: {
      id: 1, //Is needed for fetch/save to work
      host: "",
      username: ""
    }
  });

  App.addInitializer(function() {
    var settings = new Models.Settings();
    settings.fetch();
    App.Shared.Models.Settings.instance = settings;
  });
});
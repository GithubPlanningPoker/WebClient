App.module("Model", function(Model, App, Backbone, Marionette, $, _){
  Model.Settings = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("settings"),
    defaults: {
      id: 1, //Is needed for fetch/save to work
      host: "",
      username: ""
    }
  });

  App.addInitializer(function() {
    var settings = new Model.Settings();
    settings.fetch();
    App.Model.Settings.instance = settings;
    console.log(settings.attributes);
  });
});
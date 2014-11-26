App.module("Shared.Models", function(Models, App, Backbone, Marionette, $, _){
  Models.Session = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("ghpp-session"),

    defaults: {
      id: 1, //Is needed for fetch/save to work
      gameId: "",
      userId: ""
    }
  });

  App.addInitializer(function() {
    var session = new Models.Session();
    session.fetch();
    App.Shared.Models.Session.instance = session;
  });
});
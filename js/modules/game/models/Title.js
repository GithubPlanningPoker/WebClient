App.module("Game.Models", function(Models, App, Backbone, Marionette, $, _) {
  Models.Title = Backbone.Model.extend({
    interval: null,

    initialize: function() {
      this.url = App.Shared.Models.Preferences.instance.get("host") + "/game/" + App.Shared.Models.Session.instance.get("gameId") + "/title";
    }
  });
});
App.module("Game.Models", function(Models, App, Backbone, Marionette, $, _) {
  Models.Player = Backbone.Model.extend({
  	idAttribute: "username"
  });
});
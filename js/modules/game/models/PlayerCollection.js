App.module("Game.Models", function(Models, App, Backbone, Marionette, $, _) {
  Models.PlayerCollection = Backbone.Collection.extend({
  	model: Models.Player,
  	comparator: "username",

  	initialize: function() {
  		this.url = App.Shared.Models.Preferences.instance.get("host") + "/game/" + App.Shared.Models.Session.instance.get("gameId") + "/user";
  	},

  	parse: function(data) {
  		return data.users;
  	}
  });
});
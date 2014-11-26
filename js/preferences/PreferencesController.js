App.module("Preferences", function(Preferences, App, Backbone, Marionette, $, _) {
  Preferences.Controller = {
  	view: null,
  	preferences: null,

    show: function() {
    	this.preferences = App.Shared.Models.Preferences.instance;
    	this.view = new App.Preferences.Views.PreferencesLayout({ model: this.preferences });
      App.container.show(this.view);
    },

    savePreferences: function(APIHost, username) {
    	this.preferences.set("host", APIHost);
    	this.preferences.set("username", username);
    	this.preferences.save();
    }
  };
});

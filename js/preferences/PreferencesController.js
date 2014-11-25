App.module("Preferences", function(Preferences, App, Backbone, Marionette, $, _) {
  Preferences.Controller = {
    show: function(){
      App.container.show(new App.Preferences.Views.PreferencesLayout());
    },
  };
});

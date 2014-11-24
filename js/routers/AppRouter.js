var ghpp = ghpp || {};
ghpp.routers = ghpp.routers || {};

ghpp.routers.AppRouter = Backbone.Marionette.AppRouter.extend({
  initialize: function (options) {
    var self = this;
    self.container = options.container;
  },
  routes: {
    '': 'start',
    'start': 'start',
    'join/:gameId': 'join',
    'game/:gameId': 'game',
    '*default': 'notFound'
  },
  start: function () {
    this.container.show(new ghpp.views.StartLayout());
  },
  join: function (gameId) {
    this.container.show(new ghpp.views.JoinLayout());
  },
  game: function (gameId) {
    this.container.show(new ghpp.views.GameLayout());
  },
  notFound: function () {
    this.container.reset();
  }
});
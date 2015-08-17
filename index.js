// /* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-styles-reloader',

  serverMiddleware: function(config){
    var lsReloader = require('./lib/styles-reloader')(config.options);
    lsReloader.run();
  },

  included: function(app){
    if (app.env === 'development'){
      app.import('vendor/ember-cli-styles-reloader/base.css');
    }
  },
};

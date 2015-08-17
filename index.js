// /* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-styles-reloader',

  included: function(app){
    var supportedEnv = 'development';
    if (app.env !== supportedEnv){
      return;
    }

    var config = app.project.config(supportedEnv);
    var addonConfig = config[this.name] || { animateChanges: false };
    if (addonConfig.animateChanges){
      app.import('vendor/ember-cli-styles-reloader/base.css');
    }
  },

  serverMiddleware: function(config){
    var lsReloader = require('./lib/styles-reloader')(config.options);
    lsReloader.run();
  }
};

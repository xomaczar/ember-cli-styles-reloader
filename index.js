// /* jshint node: true */
// 'use strict';

module.exports = {
  name: 'ember-cli-styles-reloader',

  serverMiddleware: function(config){
    var lsReloader = require('./lib/styles-reloader')(config.options);
    lsReloader.run();
  },

  contentFor: function(type, config){
    if (type === "head" && config.environment === 'development'){
        var localConfig = config[this.name] || { animateChanges: false };
        if (localConfig.animateChanges){
            return "<style> * { transition: all 0.3s ease; } </style>";
        }
    }
    return '';
  }
};

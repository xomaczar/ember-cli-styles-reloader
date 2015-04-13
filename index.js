/* jshint node: true */
'use strict';

/* default reload css extensions */
var styleExtensions = ['css', 'scss', 'sass', 'less', 'styl'];
var reloadCssPattern = new RegExp('.(' + styleExtensions.join('|') + ')$' );

function LiveStyleReloader(options){

    var noop = function(){},
        options = options,
        ui = options.ui,
        http = null,
        liveReloadHostname = ['http://', options.host, ':', options.liveReloadPort].join(''),
        reloadCssPattern = options.reloadCssPattern;

    var fileDidChange = function(results){
        var filePath = results.filePath || '';

        if (filePath.match(reloadCssPattern)){
            http.get(liveReloadHostname + '/changed?files=*.css')
                .on('error', noop);
        }
    };

    this.startObserving = function(watcher){
        if (options.liveReload){
            ui.writeLine('StyleReloader watches ' + styleExtensions.join('|'));
            http = require('http');
            watcher.on('change', fileDidChange.bind(this));
        }
    };
};

module.exports = {
  name: 'ember-cli-styles-reloader',

  serverMiddleware: function(config){
    var options = config.options;

   // Tell ember-cli to ignore files that match reloadCssPattern
    options.project.liveReloadFilterPatterns.push(reloadCssPattern);
    options.reloadCssPattern = reloadCssPattern

    var lsReloader = new LiveStyleReloader(options);
    lsReloader.startObserving(options.watcher);
  },

  contentFor: function(type, config){
    var config = config[this.name] || { animateChanges: true };
    if (type === "head" && config.environment === 'development' && config.animateChanges){
        return "<style> * { transition: all 0.5s ease; } </style>";
    }
    return '';
  }

};
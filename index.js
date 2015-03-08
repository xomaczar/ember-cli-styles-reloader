/* jshint node: true */
'use strict';

/* default reload css extensions */
var styleExtensions = ['css', 'scss', 'sass', 'less', 'styl'];
var reloadCssPattern = new RegExp('.(' + styleExtensions.join('|') + ')$' );
var noop = function(){};

function LiveStyleReloader(options){

    var options = options,
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
            ui.writeLine('StyleReloader refreshes ' + styleExtensions.join('|'));
            http = require('http');
            watcher.on('change', fileDidChange.bind(this));
        }
    };
};


module.exports = {
  name: 'ember-cli-styles-reloader',

  serverMiddleware: function(options){
    var options = options.options;

   // Tell ember-cli to ignore files that match reloadCssPattern
    options.project.liveReloadFilterPatterns.push(reloadCssPattern);
    options.reloadCssPattern = reloadCssPattern

    var lsReloader = new LiveStyleReloader(options);
    lsReloader.startObserving(options.watcher);
  },

};
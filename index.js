/* jshint node: true */
'use strict';

/* default reload css extensions */
var styleExtensions = ['css', 'scss', 'sass', 'less', 'styl'];
var reloadCssPattern = new RegExp('.(' + styleExtensions.join('|') + ')$' );

function LiveStyleReloader(options){

    var noop = function(){},
        options = options,
				appCssPattern = new RegExp('^' + options.project.root + '/app/styles/*'),
        ui = options.ui,
        http = null,
        liveReloadHostname = ['http://', options.host, ':', options.liveReloadPort].join(''),
        reloadCssPattern = options.reloadCssPattern;

		var getDirtyAsset = function(changedFilePath){
			if (changedFilePath.match(appCssPattern)){
				return options.project.pkg.name + '.css';	
			}
			return 'vendor.css';
		};

    var fileDidChange = function(results){
        var filePath = results.filePath || '';
				var dirtyAsset = getDirtyAsset(filePath);

        if (filePath.match(reloadCssPattern)){
						ui.writeLine("Reloading " + dirtyAsset + " only");
            http.get(liveReloadHostname + '/changed?files=' + dirtyAsset)
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
    if (type === "head" && config.environment === 'development'){
        var localConfig = config[this.name] || { animateChanges: false };
        if (localConfig.animateChanges){
            return "<style> * { transition: all 0.3s ease; } </style>";
        }
    }
    return '';
  }

};

/* jshint node: true */
'use strict';

var path = require('path');
var http = require('http');

/* default reload css extensions */
var styleExtensions = ['css', 'scss', 'sass', 'less', 'styl'];
var reloadCssPattern = new RegExp('\.(' + styleExtensions.join('|') + ')$');

var noop = function(){};

module.exports = function StylesReloader(options){
  var options = options;
  var liveReloadEnabled = options.liveReload;
  var fsWatcher = options.watcher;
  var ui = options.ui;

  // Build app style pattern
  var appStylePath = options.project.root + path.join('/app', 'styles', '*');
  var appStylePattern = new RegExp('^' + appStylePath);
  var appStyleResource = options.project.pkg.name + '.css';

  // Livereload host/port
  var liveReloadHostname = [
    (options.ssl ? 'https://' :'http://'),
    (options.liveReloadHost || options.host),
    ':',
    options.liveReloadPort
  ].join('');

  function getChangedStyle(filePath){
    if (filePath.match(appStylePattern)){
      return appStyleResource;
    }
    return 'vendor.css';
  };

  function fileDidChange(results){
    var filePath = results.filePath || '';
    var liveReloadFile = getChangedStyle(filePath);

    if (filePath.match(reloadCssPattern)){
      ui.writeLine('Reloading ' + liveReloadFile + ' only');
      http.get(liveReloadHostname + '/changed?files=' + liveReloadFile)
          .on('error', noop);
    }
  };

  function updateReloadFilters(){
    options.project.liveReloadFilterPatterns.push(reloadCssPattern);
  };

  return {
    run: function(){
      if (liveReloadEnabled){
        ui.writeLine('StylesReloader watches ' + styleExtensions.join('|'));
        updateReloadFilters();
        fsWatcher.on('change', fileDidChange.bind(this));
      }
    }
  };
};
var sReloader = require('../lib/styles-reloader');
var expect = require('chai').expect;
var should = require('chai').should();


describe("styles reloader", function(){
  var watcher = {
    _handlers: [],

    on: function(event, handler){
      this._handlers[event] = handler;
    },

    trigger: function(event, args){
      this._handlers[event].call(this, args);
    }
  };
  var opts = {
    uiMsg: [],
    liveReload: true,
    ui: { writeLine: function(msg){ opts.uiMsg.push(msg); }},
    project: { root: 'app', pkg: {name:'app'}, liveReloadFilterPatterns:[]},
    watcher: watcher
  };

  var resetOptions = function(){
    watcher._handlers.length = 0;
    opts.uiMsg.length = 0;
    opts.liveReload = true;
    opts.project.liveReloadFilterPatterns.length = 0;
    opts.watcher = watcher;
  };

  beforeEach(function(){
   resetOptions();
  });

  it('does not run when liveReload is disabled. Must inform the user', function(done){
    opts.liveReload = false;
    var rl = sReloader(opts);
    rl.run();
    rl.isRunning().should.equal(false);
    opts.uiMsg.length.should.equal(1);
    opts.uiMsg[0].should.equal('StylesReloader is disabled');
    done();
  });

  it('does not run if watcher is not defined.', function(done){
    delete opts.watcher;
    var rl = sReloader(opts);
    rl.run();
    rl.isRunning().should.equal(false);
    done();
  });

  it('attaches default liveReload regex', function(done){
    opts.project.liveReloadFilterPatterns.should.be.empty;
    sReloader(opts).run();
    opts.project.liveReloadFilterPatterns.should.deep.equal([/.(css|scss|sass|less|styl)$/]);
    done();
  });

  it('runs as expected', function(done){
    var rl = sReloader(opts);
    rl.run();
    rl.isRunning().should.equal(true);
    opts.uiMsg[0].should.have.string('StylesReloader watches');
    done();
  });

});
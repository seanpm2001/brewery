var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var readConfig = require('general-hammond')();
var proxy = require('./proxy').bind(null, app);

readConfig(function(config) {
  var log = app.log = require('logginator')(config.log);
  require("winston-tagged-http-logger")(server, log.createSublogger('http'));

  proxy('/manage', 'http://localhost:' + config.sahti.port);
  proxy('/auth', 'http://localhost:' + config.stout.port);
  proxy('/api', 'http://localhost:' + config.kvass.port);
  proxy('/upload', 'http://localhost:' + config.lambic.port);
  proxy('', 'http://localhost:' + config.saison.port);

  server.listen(5000);
});
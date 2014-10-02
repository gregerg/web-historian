var http = require("http");
var handler = require("./request-handler");
var express = require("express");
var bodyParser = require('body-parser')
// TODO: requirements for request handler
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');


var app = express();
var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies


app.use(express.static(__dirname + '/public'));


app.use('/', handler);

app.use('/sites',express.static(__dirname + '/../archives/sites',{
  'setHeaders': function(res){res.setHeader('Content-type', 'text/html')}
}));

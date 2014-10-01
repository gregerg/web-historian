var http = require("http");
var handler = require("./request-handler");
var express = require("express");
// TODO: requirements for request handler
var archive = require('../helpers/archive-helpers');



var app = express();
var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});


app.use(express.static(__dirname + '/public'));

app.use('/', handler);

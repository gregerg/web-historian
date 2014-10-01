var http = require("http");
var handler = require("./request-handler");
var express = require("express");
// TODO: requirements for request handler
var archive = require('../helpers/archive-helpers');



var app = express();
var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});

app.get('/',function(req,res){

  // res.send(200,archive.paths.list);
  res.status(200).send('<input>');
});

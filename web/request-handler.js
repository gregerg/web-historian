var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var express = require("express");
var router = express.Router();

var sitesPath = __dirname+'/../archives/sites.txt';
var dataPath = __dirname+'/../archives/sites';

router.get('/',function(req,res){
  // res.send(200,archive.paths.list);
  res.status(200).send('<input>');
});

router.get('/:domain',function(req,res){
  var domain = req.params.domain;
  fs.readFile(sitesPath,{encoding:'utf8'},function(err,data){
    if(err) res.send(500,err+'Our sites index exploded!');
    var lines = data.split('\n');
    var found = false;
    for(var i = 0; i < lines.length; i++){
      if(lines[i]===domain){
        found = true;
        res.status(200).send('hurray');
      }
    }

    if(!found){
      res.status(404).send('Oh no!');
    }

  });
});
router.post('/:domain',function(req,res){
  var domain = req.params.domain;

});


module.exports = router;

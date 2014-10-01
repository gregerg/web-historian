var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var express = require("express");
var router = express.Router();

var sitesPath = __dirname+'/../archives/sites.txt';
var dataPath = __dirname+'/../archives/sites';

var index = {

};
var makeIndex = function(){
  fs.readFile(sitesPath,{encoding:'utf8'},function(err,data){
    if(err) throw err;
    var lines = data.split('\n');
    var found = false;
    for(var i = 0; i < lines.length; i++){
      index[lines[i]] = i;
    }
    console.log('Successfully populated index!');
  });
};

makeIndex();

router.get('/',function(req,res){
  // res.send(200,archive.paths.list);
  res.status(200).send('<input>');
});
router.get('/:domain',function(req,res){
  var domain = req.params.domain;
  if(index.hasOwnProperty(domain)){
    var filePath = dataPath+'/'+domain;

    fs.readFile(filePath,{encoding:'utf8'},function(err,data){
      if(err) throw err;
      res.status(200).send(data);
    });

  }else{
    res.status(404).send('It is not there');
  }
});
router.post('/',function(req,res){
  var domain = req.body.url;
  if(index.hasOwnProperty(domain)){
    // redirect to our get.
      res.redirect(302,'/'+domain);
  }else{
    // create it! (add it to the archive)
    var temp = '\n'+domain;
    fs.appendFile(sitesPath,temp,function(err){
      if(err) res.status(500).send('Our index exploded far!')
      console.log('Someone saved a file on us!');
      index[domain] = true;
      res.redirect(302,'/loading.html');
    })
  }
});


module.exports = router;

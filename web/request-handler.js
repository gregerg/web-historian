var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var express = require("express");
var router = express.Router();

var helpers = require('./http-helpers.js');


archive.makeIndex();

// lol, deleted everything

router.post('/',function(req,res){
  var domain = req.body.url;
  if(archive.isUrlInList(domain)){
    // redirect to our get.
    archive.isURLArchived(domain, function(exists){
      if(exists){
        res.redirect(302,'/sites/'+domain);
      }else{
        res.redirect(302,'/loading.html');
      }
    })
  }else{
    // create it! (add it to the archive)
    archive.addUrlToList(domain,function(){
      res.redirect(302,'/loading.html');
    });
  }
});


module.exports = router;

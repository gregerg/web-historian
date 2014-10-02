var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var sitesPath = __dirname+'/../archives/sites.txt';
var dataPath = __dirname+'/../archives/sites';

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var index = {

};

exports.makeIndex = function(){
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

exports.addDomain = function(domain,callback) {
  var temp = '\n'+domain;
  fs.appendFile(sitesPath,temp,function(err){
    if(err) res.status(500).send('Our index exploded far!')
    console.log('Someone saved a file on us!');
    index[domain] = true;
    callback();
  });
};

exports.isArchived = function(domain,callback){
  fs.exists(dataPath+'/'+domain,callback)
}

exports.hasDomain = function(domain) {
  return index.hasOwnProperty(domain);
};
// As you progress, keep thinking about what helper functions you can put here!

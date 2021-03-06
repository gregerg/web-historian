var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var q = require('q');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
var paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

var index = {};


exports.paths = paths;


// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  return index;
};

exports.isUrlInList = function(domain) {
  return index.hasOwnProperty(domain);
};

exports.addUrlToList = function(domain,callback) {
  var temp = '\n'+domain;
  fs.appendFile(paths.list,temp,function(err){
    if(err) res.status(500).send('Our index exploded far!')
    console.log('Someone saved a file on us!');
    index[domain] = true;
    callback();
  });
};

exports.isURLArchived = function(domain,callback){
  fs.exists(paths.archivedSites+'/'+domain,callback)
};

exports.downloadUrls = function(){

};

exports.archiveUrl = function(url,data,timestamp){
  //create the file name 'url'
  //write data to the file
  var d = q.defer();
  fs.writeFile(paths['archivedSites']+'/'+url, data, function(err) {
    if (err) throw err;
    d.resolve();
  });
  //for extra credit (in the future) append a timestamp to the name? dunno!

  return d.promise;
}
// archiveUrl().then(function(data){ // Success!!!};)
exports.makeIndex = function(callback){
  fs.readFile(paths.list,{encoding:'utf8'},function(err,data){
    if(err) throw err;
    var lines = data.split('\n');
    var found = false;
    for(var i = 0; i < lines.length; i++){
      index[lines[i]] = i;
    }
    if(callback){callback()};
  });
};

//addUrlToList
//exports.addDomain =

//isUrlArchived
// exports.isArchived =

//isUrlInList
// exports.hasDomain =

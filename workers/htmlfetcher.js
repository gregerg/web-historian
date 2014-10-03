// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var helper = require('../web/http-helpers');
var archive = require('../helpers/archive-helpers.js');
var _ = require('underscore');
archive.makeIndex(function(){
  var list = archive.readListOfUrls();
  _.each(list, function(domain,k) {
      helper.fetchPageAsync(k);
    });
});

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var helper = require('../web/http-helpers');
// var archive = require('../helpers/archive-helpers.js');

// archive.makeIndex();

// var list = archive.getUrlList();

// _.each(list, function(domain) {
//   helper.fetchPageAsync(domain);
// });
//TODO: fetch all domains in list
helper.fetchPageAsync("www.google.com");

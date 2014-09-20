// ECT based diet plugin for rendering Dynamic HTML files

// Dependencies
require('sugar')
var fs = require('fs');
var ect = require('ect');
var renderer; 

// Setup when loaded
exports.onload = function($, options){
	renderer = ect(Object.merge({ 
		root : $.path+'/static/', 
		ext: '.html', 
		open: '{{', close: '}}',
		cache: true,
		watch: true,
		gzip: true,
	}, options));
	$.return();
}

// Create Route Global
exports.global = function($, options){
	$.return(function(pathname){
		var path = pathname ? pathname : 'index.html' ;
		var context = Object.merge(Object.clone($), $.data);
		var html = renderer.render(path, context);
		$.header('content-type', 'text/html');
		$.end(html);
	});
}

module.parent.return();


module.exports = function (app, service) {
	var https = require('https');
	var querystring = require('querystring');

    app.get('/', function(req, res){
    	
		res.render('index', { title: 'API'});
	});

};
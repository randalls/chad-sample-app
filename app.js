var express = require('express');
var app = express();
var environment = require('./environment');
var service = require('./service');
    service.init(environment);

require('./configuration')(app, express);
require('./controllers')(app, service, environment);

app.listen(app.get('port'));
//app.listen(3000);
console.log('Express server listening on port http://localhost:' + app.get('port') + ' in ' + app.settings.env + ' mode');
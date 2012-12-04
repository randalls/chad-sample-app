// configuration module 
// All express and connect configuration must there
module.exports = function(app, express){
    app.configure(function() {
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('base', __dirname);
        app.set('view engine', 'jade');
        app.use(express.logger(':method :url :status'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({secret: '[SECRET SESSION KEY]'}));
        app.use(require('less-middleware')({ src: __dirname + '/public' }));
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 
    });
    
    app.configure('production', function() {
      app.use(express.errorHandler()); 
      // app.get('*',function(req,res,next){
      //     if(req.headers['x-forwarded-proto']!='https')
      //       res.redirect('https://'+req.host+req.url)
      //     else
      //       next() /* Continue to other routes if we're not redirecting */
      //   });
    });
};
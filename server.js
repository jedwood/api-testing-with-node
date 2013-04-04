var express = require('express'),
    app     = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

app.all('/*', function(req, res, next) {
  //IRL, lookup in a database or something
  if (typeof req.headers['x-api-key'] !== 'undefined' && req.headers['x-api-key'] === '123myapikey') {
    next();
  } else {
    res.status(401).send({error: "Bad or missing app identification header"});
  }
});

app.get('/blog', express.basicAuth('correct', 'credentials'), function(req, res) {
  res.send({posts:['one post', 'two post']});
});

app.listen(app.get('port'), function(){
  console.log("Example API listening on port " + app.get('port') + ', running in ' + app.settings.env + " mode.");
});

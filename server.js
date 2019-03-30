var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var fs = require('fs');
var _ = require('underscore');
var device = require('express-device');
var requestIp = require('request-ip');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var Ddos = require('ddos');
var compression = require('compression');

var port = process.env.PORT || 8080;
var app = express();
var ddos = new Ddos({burst: 50, limit: 100, maxexpiry: 5});
app.use(ddos.express);
app.use(compression());


// var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/csc301project';

var dbUrl = process.env.MONGOLAB_URI || 'mongodb+srv://new_katherine:new_katherine@cluster0-vgeap.mongodb.net/test?retryWrites=true';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true,
  useCreateIndex: true
});

// models loading
var models_path = __dirname + '/app/models';
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file;
      var stat = fs.statSync(newPath);

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath);
        }
      }
      else if (stat.isDirectory()) {
        walk(newPath);
      }
    })
}
walk(models_path);



app.set('views','./app/views/pages');  //views files
app.set('view engine','pug');//set templete
app.use(express.static(path.join(__dirname,'public'), {maxAge: '1d'}));
app.locals.moment = require('moment');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(session({
	secret:'maker',
	resave: false,
	saveUninitialized: true,
	store: new mongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true,
    // url: dbUrl,
		collection: 'sessions'
	})
}));

app.set('view options', { layout: false });
app.use(device.capture());


var env = process.env.NODE_ENV || 'development';

if ('development' === env) {
	//print
	app.set('showStackError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}

require('./config/router')(app);

app.listen(port);	//starts here!!!

console.log('Started on port:' + port);

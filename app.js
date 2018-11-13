// require dependencies
const express = require('express');
const logger  = require( 'morgan');
const cookieParser = require( 'cookie-parser');
const bodyParser = require('body-parser');
//const favicon  = require( 'serve-favicon';

// import config
const config = require('./server/config');
const router = require( './server/router');
const tokens = require('./server/token');

const app = express();

app.set('views', __dirname + '/dist');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/dist'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// root token verify
app.all('*', function(req, res, next) {
    console.log('token verify', req.url);
    if(config.token.safe.indexOf(req.url) === -1 && req.url.slice(0, 7) !== '/static'){
        console.log('token verify::[[['+req.url, ']]] need to verify');
        let token = req.body.token || req.query.token || req.headers[config.token.key] || req.cookies[config.token.key];
        let ret = tokens.verify(token);
        if( ret > 0 ){
            tokens.update(token);
            next();
        } else {
            res.header("Content-Type", "text/html");
            return res.redirect('/');
        }
    }
    next();
});

// root url router
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type" + ',' + config.token.key);
    res.header("Access-Control-Allow-Methods","*");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// load route
router(app);

app.listen(config.server.port);
console.log('timer server start at port '+ config.server.port);
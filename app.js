// require dependencies
const express = require('express');
const logger  = require( 'morgan');
const cookieParser = require( 'cookie-parser');
const bodyParser = require('body-parser');
//const favicon  = require( 'serve-favicon';

// import config
const config = require('./server/config');
const router = require( './server/router');

const app = express();

app.set('views',__dirname + '/dist');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/dist'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// load route
router(app);

app.listen(config.server.port);
console.log('timer server start at port '+ config.server.port);
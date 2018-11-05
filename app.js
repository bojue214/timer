// require dependencies
const express = require('express');
const logger  = require( 'morgan');
const cookieParser = require( 'cookie-parser');
const bodyParser = require('body-parser');
//const favicon  = require( 'serve-favicon';

// import config
const config = require('./server/config');
const router = require( './server/router');
const token = require('./server/token');

const app = express();

app.set('views',__dirname + '/dist');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/dist'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('*', function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,TIMER-TOKEN");
    response.header("Access-Control-Allow-Methods","*");
    response.header("X-Powered-By",' 3.2.1')
    response.header("Content-Type", "application/json;charset=utf-8");
    next();
    /*
    if(request.header['TIMER-TOKEN']){
        if(token.check(request.header['TIMER-TOKEN'])){
            token.update(request.header['TIMER-TOKEN']);
            next();
        } else {
            token.delete(request.header['TIMER-TOKEN']);
            response.redirect(302, '/');
        }
    }
    */


    console.log('11111', request.url);
    /*
    if(true){    
        next();
    } else{
        
    }
    */
});

// load route
router(app);

app.listen(config.server.port);
console.log('timer server start at port '+ config.server.port);
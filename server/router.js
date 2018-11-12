const express = require('express');
const user = require('./route/user');

module.exports = function(app){

    const router = express.Router();

    router.get('/login', function(req, res){
        res.header("Content-Type", "text/html");
        res.redirect('/');
    });

    app.use(router);
    app.use('/api/user', user);
};
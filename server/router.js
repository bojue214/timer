const express = require('express');
const path = require('path');

const user = require('./route/user');
module.exports = function(app){

    const router = express.Router();

    router.get(['/', '/login'], function(req, res){
        res.sendFile(path.join(__dirname + "../../dist/index.html"));
    });

    app.use(router);
    app.use('/api/user', user);
};
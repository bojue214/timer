const express = require('express');
const controller = require('../controller/user');
const router = express.Router();

router.get('/', function(req, res){
    res.send('2132132131');
});

router.get('/login', function(req, res){
    let user = controller.login(req.body.account,req.body.password );
    res.send(user);
});

router.post('/login', function(req, res){
    let user = controller.login(req.query.account,req.query.password );
    res.send(user);
});


module.exports = router;
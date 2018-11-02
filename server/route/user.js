const express = require('express');
const controller = require('../controller/user');
const router = express.Router();

router.post('/login', function(req, res){
    let user = controller.login(req.body.account,req.body.password );
    res.send(user);
});


module.exports = router;
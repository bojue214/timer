const express = require('express');
const user = require('../controller/user');
const router = express.Router();

//  /api/user/login
router.post('/login', function(req, res){
    res.send(user.login(req.body.account, req.body.password));
});


module.exports = router;
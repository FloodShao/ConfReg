var session = require('express-session');
var express = require('express');
var router = express.Router();


router.get('/', getCallback);

async function getCallback(req, res, next){
    req.session.user = null;
    req.flash('success', '登出成功');
    return res.redirect('/');
}

module.exports = router;
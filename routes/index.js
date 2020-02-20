var express = require('express');
var dbclient = require('../models/mysql');
var router = express.Router();
var User = require('../models/user');
var session = require('express-session');

/* GET home page. */
router.get('/', getcallback);

async function getcallback(req, res, next){
  var sess = req.session;
  if(sess.user){
    console.log(sess.user);
    res.render('index', {title: 'IMWS-AMP 2020'});
    return;
  }
  res.render('index', {msg: '请登录后操作', title: 'IMWS-AMP 2020'});
}

module.exports = router;

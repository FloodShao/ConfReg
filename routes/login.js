var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var session = require('express-session');

router.get('/', getCallback);

router.post('/', postCallback);

async function getCallback(req, res, next){
    res.render('login', {title : 'Login' });
    error: req.flash('error').toString();
}

async function postCallback(req, res){
    if(!req.body.username){
        req.flash('error', '用户名为空');
        return res.redirect('/login');
    }

    //生成口令散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User
    .get(req.body.username)
    .then(function(resolve){
        if(!resolve){
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }

        console.log(resolve);
        if(password != resolve['Upassword']){
            req.flash('error', '用户密码错误');
            return res.redirect('/login');
        }

        //创建会话session
        req.session.user = resolve;
        req.flash('success', '登录成功');
        return res.redirect('/');

    })
    .catch(function(reject){
        console.error(reject);
    })

}

module.exports = router;
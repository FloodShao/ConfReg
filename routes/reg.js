var express = require('express');
var router = express.Router();
var dbClient = require('../models/mysql');
var User = require('../models/user');
var crypto = require('crypto');

router.get('/', getcallback);
router.post('/', postcallback);

async function postcallback(req, res, next){
    if(!req.body.username){
        req.flash('error', '用户名为空');
        return res.redirect('/reg');
    }
    if(!req.body.password){
        req.flash('error', '密码为空');
        return res.redirect('/reg');
    }
    if(req.body.password != req.body['password-repeat']){
        req.flash('error', '密码不一致');
        return res.redirect('/reg');
    }

    //生成散列口令
    var md5 = crypto.createHash("md5");
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        username : req.body.username,
        password : password
    });

    User
    .get(newUser.username)
    .then(function(resolve){
        if(resolve){
            var err = '用户已存在,请登录';
            req.flash('error', err);
            return res.redirect('/reg');
        }

        //保存新user
        newUser
        .save()
        .then(function(resolve){
            req.session.user = newUser;
            req.flash('success', '注册成功');
            res.redirect('/reg');
        })
        .catch(function(reject){
            console.error(reject);
        });
    })
    .catch(function(reject){
        console.error(reject);
    });
    
}

async function getcallback(req, res, next){
    res.render('reg', {title : 'Register'});
}

module.exports = router;
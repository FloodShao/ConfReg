'use strict';
var dbclient = require('./mysql');

function User(user){ //构造函数
    this.username = user.username;
    this.password = user.password;
}

module.exports = User;

User.prototype.save = async function save(){
    var user = {
        'Username' : this.username,
        'Upassword' : this.password
    };
    console.log(this.password);
    var res = await dbclient
        .insert('User', user)
        .execute()
        .then(function(resolve){
            console.log(resolve);
        })
        .catch(function(reject){
            console.error(reject);
        })
    return res;
};

User.get = async function(username){
    var res = await dbclient
        .select('*')
        .from('User')
        .where('Username', username)
        .queryRow();
    return res;
}
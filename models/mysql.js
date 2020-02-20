var dbClient = require('ali-mysql-client');

var db = new dbClient({
    // host
    host : 'localhost',
    // port
    port : '3306',
    // username
    user : 'shaoguoliang',
    // password
    password : 'shaoguoliang',
    // database name
    database : '2020_imws_amp_attendee'
});

module.exports = db;


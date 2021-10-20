var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "156.67.222.85",
    user: "u110886746_otp",
    password: "Hitesh@1234",
    database: "u110886746_sms"
});
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root@123",
//     database: "dharmeshdb",

// });
connection.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");    
    }
    
});

global.con = connection;
exports = con;

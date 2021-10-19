var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dharmeshdb"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

global.con = connection;
exports = con;

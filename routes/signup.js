var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
multer = require('multer');
var cors = require('cors');
router.use(cors());
router.post('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var queryInsert = "INSERT INTO customers  SET ?";
    bcrypt.genSalt(saltRounds, function (err, salt) {

        bcrypt.hash(req.body.password, salt, function (err, hash) {
            let param = {
                role: req.body.role,
                name: req.body.name,
                email: req.body.email,
                password: hash,
                profile_pic: req.body.profile_pic,
                birthdate: new Date(req.body.birthdate)
            }
            con.query(queryInsert, param, function (err, result) {
                if (err) {
                    if (err.code && err.code == "ER_DUP_ENTRY") {
                        res.send("duplicate entery");
                    } else {
                        res.send(err);
                    }
                } else {
                    res.send(result);
                }
            });
        });
    });
})
router.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var query = "SELECT * FROM customers";
    con.query(query, function (err, result) {
        res.send(result)
    });
});
module.exports = router;

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('./../config.js');
let middleware = require('./../middleware.js');
let jwt = require('jsonwebtoken');
var path = require('path');
var cors = require('cors')
router.use(cors());

router.put('/:id', function (req, res) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            let updateUsersParam = {
                name: req.body.name,
                email: req.body.email,
                birthdate: new Date(req.body.birthdate),
            }
            var idParam = req.params.id;
            let sql = "UPDATE customers SET ? WHERE id=" + idParam;
            con.query(sql, updateUsersParam, function (error, results) {
                if (error) {
                    res.send(error);
                }
                else {
                    res.send(results);
                }
            });
        });
    });
});
module.exports = router;
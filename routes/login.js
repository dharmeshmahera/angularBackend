var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('./../config.js');
let middleware = require('./../middleware.js');
let jwt = require('jsonwebtoken');
var cors = require('cors')
router.use(cors());

router.post('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let param = {
        email: req.body.email,

    }
    con.query('SELECT * FROM customers WHERE email = ?', [param.email], function (error, results, fields) {
        if (results.length > 0) {
            bcrypt.compare(req.body.password, results[0].password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ email: param.email },
                        config.secret, {
                        expiresIn: '24h'
                    }
                    );
                    if (err) throw err;
                    else {
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token,
                            role: results[0].role,
                            email: results[0].email,
                            id: results[0].id
                        });
                    }
                } else {
                    res.send('Incorrect Password!')
                }
            });
        } else {
            res.send("Email Address Not Found!")
        }

    });


})
router.put('/password_reset/:email', function (req, res) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            let updateUsersParam = {
                password: hash
            }
            var emailParam = req.params.email;
            let sql = "UPDATE customers SET ? WHERE email =" + "'" + emailParam + "'";
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
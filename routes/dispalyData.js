var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');
router.use(cors());
router.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var query = "SELECT * FROM customers";
    con.query(query, function (err, result) {
        res.send(result)
    });
});
router.get('/:id', function (req, res) {
    var idParam = req.params.id;

    res.setHeader('Access-Control-Allow-Origin', '*');
    var query = "SELECT * FROM customers WHERE id=" + idParam;
    con.query(query, function (err, result) {
        res.send(result)

    });
});
router.delete('/:id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var idParam = req.params.id;
    var query = "DELETE FROM customers WHERE id=" + idParam + "";
    con.query(query, function (err, result) {
        if (result.length == 0) {
            res.send("no record found");
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
    });
});
router.get('/:id', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var idParam = req.params.id;
    var query = "DELETE FROM customers WHERE id=" + idParam + "";
    con.query(query, function (err, result) {
        if (result.length == 0) {
            res.send("no record found");
        } else {
            res.send("success")
        }

    });
});
module.exports = router;
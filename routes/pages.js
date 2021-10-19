var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');
router.use(cors());


router.get('/', function (req, res) {
    var query = "SELECT * FROM pages";
    con.query(query, function (err, result) {
        res.send(result)

    });
});

router.post('/', function (req, res) {
    var queryInsert = "INSERT INTO pages  SET ?";
    let param = {
        title: req.body.title,
        content: req.body.content,
    }
    con.query(queryInsert, param, function (err, result) {
        if (err) {
            if (err.code && err.code == "ER_DUP_ENTRY") {
                res.send("duplicate entry");
            } else {
                res.send(err);
            }
        } else {
            res.send(result);
        }
    });

})
router.get('/:id', function (req, res) {
    var idParam = req.params.id;
    var query = "SELECT * FROM pages WHERE pageid=" + idParam;
    con.query(query, function (err, result) {
        res.send(result)

    });
});
router.delete('/:id', function (req, res) {
    var idParam = req.params.id;
    var query = "DELETE FROM pages WHERE pageid=" + idParam + "";
    con.query(query, function (err, result) {
        if (result.length == 0) {
            res.send("no record found");
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
    });
});
router.put('/:id', function (req, res) {
    let updateUsersParam = {
        title: req.body.title,
        content: req.body.content,
    }
    var idParam = req.params.id;
    let sql = "UPDATE pages SET ? WHERE pageid=" + idParam;
    con.query(sql, updateUsersParam, function (error, results) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(results);
        }

    });
});
module.exports = router;
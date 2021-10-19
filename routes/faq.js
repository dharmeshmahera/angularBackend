var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');
router.use(cors());


router.get('/', function (req, res) {
    var query = "SELECT * FROM faq";
    con.query(query, function (err, result) {
        res.send(result)

    });
});

router.post('/', function (req, res) {
    var queryInsert = "INSERT INTO faq SET ?";
    let param = {
        question: req.body.question,
        answer: req.body.answer,
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
    var query = "SELECT * FROM faq WHERE faqid=" + idParam;
    con.query(query, function (err, result) {
        res.send(result)

    });
});
router.delete('/:id', function (req, res) {
    var idParam = req.params.id;
    var query = "DELETE FROM faq WHERE faqid=" + idParam + "";
    con.query(query, function (err, result) {
        if (result.length == 0) {
            res.send("no record found");
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
    });
});
router.put('/:id', function (req, res) {
    let updateParam = {
        question: req.body.question,
        answer: req.body.answer,
    }
    var idParam = req.params.id;
    let sql = "UPDATE faq SET ? WHERE faqid=" + idParam;
    con.query(sql, updateParam, function (error, results) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(results);
        }

    });
});
module.exports = router;
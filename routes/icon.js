var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
multer = require('multer');
var cors = require('cors');
router.use(cors());
router.post('/',function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var queryInsert = "INSERT INTO icon  SET ?";
  let param = {
                icon:req.body.icon,
                link: req.body.link,
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

})
router.get('/', function (req, res) {
    var query = "SELECT * FROM icon";
    con.query(query, function (err, result) {
        res.send(result)
});
});

router.delete('/:id',function(req, res){
    var idParam = req.params.id;
    var query = "DELETE FROM icon WHERE iconid=" + idParam + "";
    con.query(query,function(err, result) {
        if (result.length == 0) {
            res.send("no record found");
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
    });
});
module.exports = router;

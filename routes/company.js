var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');
router.use(cors());


router.get('/detail', function(req, res) {
    var query = "SELECT * FROM company";
    con.query(query,function(err, result) {
        res.send(result)

    });
});
router.get('/:id', function(req, res) {
    var idParam = req.params.id;
    var query = "SELECT * FROM company WHERE idcompany="+idParam;
    con.query(query,function(err, result) {
        res.send(result)

    });
});
router.put('/:id', function(req, res){
  let updateCompanyParam = {
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
            }
            var idParam = req.params.id;
            let sql = "UPDATE company SET ? WHERE idcompany=" + idParam;
            con.query(sql, updateCompanyParam, function(error, results) {
                if (error) {
                    res.send (error);
                }
                else{
                    res.send(results);
                }
                
            });
});
router.put('/logo/:id', function(req, res){
    let updateCompanyParam = {
                  logo:req.body.logo
              }
              var idParam = req.params.id;
              let sql = "UPDATE company SET ? WHERE idcompany=" + idParam;
              con.query(sql, updateCompanyParam, function(error, results) {
                  if (error) {
                      res.send (error);
                  }
                  else{
                      res.send(results);
                  }
                  
              });
  });
module.exports = router;
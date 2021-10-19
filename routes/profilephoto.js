var express = require('express');
var multer = require('multer');
var mkdir = require('mkdirp');
var router = express.Router();
var cors = require('cors')
router.use(cors());
var path = require('path');
var uploadedFilePath;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './public/uploads';
        mkdir(dir, err => cb(err, dir));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
}),
    upload = multer({ storage: storage });
router.post('/', upload.single('files'), function (req, res) {
    if (!req.file) {
        res.send("No file received")
    } else {
        res.send(req.file);
    }
});
module.exports = router;
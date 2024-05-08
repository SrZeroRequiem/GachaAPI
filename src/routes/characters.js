var express = require('express');
var router = express.Router();
const {userSchema} = require('../config')
const {jwtGenerator, verifyToken} = require('../utils/jwt')
const {getBanner} = require('../utils/gachaUtils')


/* GET users listing. */
router.get('/get-all-characters', function(req, res, next) {
    getBanner(0,10).then((waifus) => {
        res.json(waifus);
    }).catch((err) => {
        res.status(400).json({message: err});
    });
});

module.exports = router;

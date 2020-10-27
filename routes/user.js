var express = require('express');
var router = express.Router();

var { signup } = require('../controller/user');

router.post('/signin', function(req, res) {
 
});

router.post('/signup', signup);


module.exports = router;

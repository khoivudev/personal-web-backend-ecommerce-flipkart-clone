var express = require('express');
var router = express.Router();

var { signup, signin, requireSignin } = require('../controller/auth');

router.post('/signin', signin);

router.post('/signup', signup);

// router.get('/profile', requireSignin, (req, res)=>{
//   res.status(200).json({user:'profile'});
// })

module.exports = router;

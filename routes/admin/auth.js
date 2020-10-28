var express = require('express');
var router = express.Router();

var { signup, signin, requireSignin } = require('../../controller/admin/auth');

router.post('/admin/signin', signin);

router.post('/admin/signup', signup);

router.get('/admin/profile', requireSignin, (req, res)=>{
  res.status(200).json({admin:'profile'});
})

module.exports = router;

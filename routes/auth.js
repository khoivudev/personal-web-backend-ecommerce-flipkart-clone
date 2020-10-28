var express = require("express");
var router = express.Router();
var { signup, signin, requireSignin } = require("../controllers/auth");
var {
  validationSignupRequest,
  validationSigninRequest,
  isRequestValidated,
} = require("../validators/auth");

router.post("/signup", validationSignupRequest, isRequestValidated, signup);

router.post("/signin", validationSigninRequest, isRequestValidated, signin);

// router.get('/profile', requireSignin, (req, res)=>{
//   res.status(200).json({user:'profile'});
// })

module.exports = router;

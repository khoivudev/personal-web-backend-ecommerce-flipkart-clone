var express = require("express");
var router = express.Router();
var { signup, signin, signout } = require("../controllers/auth");
var {
  validationSignupRequest,
  validationSigninRequest,
  isRequestValidated,
} = require("../validators/auth");

var { requireSignin } = require("../common-middleware");

router.post("/signup", validationSignupRequest, isRequestValidated, signup);

router.post("/signin", validationSigninRequest, isRequestValidated, signin);

router.post("/signout", requireSignin, signout);

module.exports = router;

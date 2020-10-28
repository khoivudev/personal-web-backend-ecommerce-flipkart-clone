var express = require("express");
var router = express.Router();
var { signup, signin } = require("../controllers/auth");
var {
  validationSignupRequest,
  validationSigninRequest,
  isRequestValidated,
} = require("../validators/auth");

router.post("/signup", validationSignupRequest, isRequestValidated, signup);

router.post("/signin", validationSigninRequest, isRequestValidated, signin);

module.exports = router;

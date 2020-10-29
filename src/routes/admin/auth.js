var express = require("express");
var router = express.Router();
var { signup, signin } = require("../../controllers/admin/auth");
const {
  validationSignupRequest,
  validationSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

router.post("/signup", validationSignupRequest, isRequestValidated, signup);

router.post("/signin", validationSigninRequest, isRequestValidated, signin);

module.exports = router;

var express = require("express");
var router = express.Router();
var { requireSignin } = require("../../common-middleware");
var { signup, signin, signout } = require("../../controllers/admin/auth");
const {
  validationSignupRequest,
  validationSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

router.post("/signup", validationSignupRequest, isRequestValidated, signup);

router.post("/signin", validationSigninRequest, isRequestValidated, signin);

router.post("/signout", requireSignin, signout);

module.exports = router;

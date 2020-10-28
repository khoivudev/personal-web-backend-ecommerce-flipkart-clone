var express = require("express");
var router = express.Router();
var { signup, signin, requireSignin } = require("../../controllers/admin/auth");
const {
  validationSignupRequest,
  validationSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

router.post(
  "/admin/signup",
  validationSignupRequest,
  isRequestValidated,
  signup
);

router.post(
  "/admin/signin",
  validationSigninRequest,
  isRequestValidated,
  signin
);

router.get("/admin/profile", requireSignin, (req, res) => {
  res.status(200).json({ admin: "profile" });
});

module.exports = router;

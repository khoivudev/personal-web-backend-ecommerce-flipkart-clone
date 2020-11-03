var express = require("express");
var router = express.Router();
var {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../../common-middleware");
var { createPage } = require("../../controllers/admin/page");

router.post(
  "/create",
  requireSignin,
  adminMiddleware,
  upload.fields([
    {
      name: "banners",
      //  maxCount: : 10
    },
    {
      name: "products",
    },
  ]),
  createPage
);

module.exports = router;

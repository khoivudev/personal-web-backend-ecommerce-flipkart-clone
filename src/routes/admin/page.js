var express = require("express");
var router = express.Router();
var {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../../common-middleware");
var { createPage, getPage } = require("../../controllers/admin/page");

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

router.get("/:category/:type", getPage);

module.exports = router;

var express = require("express");
var router = express.Router();
const { requireSignin, adminMiddleware } = require("../common-middleware");
var { addCategory, getCategories } = require("../controllers/category");

router.post("/create", requireSignin, adminMiddleware, addCategory);

router.get("/getcategory", getCategories);

module.exports = router;

var express = require("express");
var router = express.Router();
const { requireSignin, adminMiddleWare } = require("../common-middleware");
var { addCategory, getCategories } = require("../controllers/category");

router.post("/create", requireSignin, adminMiddleWare, addCategory);

router.get("/getcategory", getCategories);

module.exports = router;

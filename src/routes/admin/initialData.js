var express = require("express");
var router = express.Router();
var { requireSignin, adminMiddleware } = require("../../common-middleware");
var { initialData } = require("../../controllers/admin/initialData");

router.get("/initialdata", requireSignin, adminMiddleware, initialData);

module.exports = router;

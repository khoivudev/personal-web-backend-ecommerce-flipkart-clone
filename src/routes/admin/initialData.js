var express = require("express");
var router = express.Router();
var { initialData } = require("../../controllers/admin/initialData");

router.get("/initialdata", initialData);

module.exports = router;

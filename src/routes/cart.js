var express = require("express");
var router = express.Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
var { addItemToCart } = require("../controllers/cart");

router.post("/addtocart", requireSignin, userMiddleware, addItemToCart);

module.exports = router;

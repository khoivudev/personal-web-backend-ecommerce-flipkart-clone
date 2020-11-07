var express = require("express");
var router = express.Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
var { addItemToCart, getCartItems } = require("../controllers/cart");

router.post("/addtocart", requireSignin, userMiddleware, addItemToCart);

router.get("/getcartitems", requireSignin, userMiddleware, getCartItems);

module.exports = router;
